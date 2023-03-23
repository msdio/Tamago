package com.project.Tamago.security.oauth2;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.project.Tamago.constants.enums.Role;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.security.CustomOAuth2User;
import com.project.Tamago.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	private final UserRepository userRepository;
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	@Transactional
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		processRegisterAndLogin(response, authentication, (CustomOAuth2User)authentication.getPrincipal());
	}

	private void processRegisterAndLogin(HttpServletResponse response,
		Authentication authentication,
		CustomOAuth2User oAuth2User) throws IOException {
		userRepository.findByEmailAndProvider(oAuth2User.getEmail(),
				oAuth2User.getOAuth2Id())
			.orElse(userRepository.save(DataMapper.INSTANCE.toUser(oAuth2User, Role.USER)));
		response.getWriter().write(loginByOAuth2(authentication));
	}

	/**
	 * 프론트엔드에서 추가로 정보 등록하는 폼이나 창이 필요할 경우
	 */
	private void processRegisterOrLogin(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication,
		CustomOAuth2User oAuth2User) throws IOException {
		Optional<User> user = userRepository.findByEmailAndProvider(oAuth2User.getEmail(),
			oAuth2User.getOAuth2Id());

		if (user.isPresent()) {
			response.getWriter().write(loginByOAuth2(authentication));
			return;
		}
		userRepository.save(DataMapper.INSTANCE.toUser(oAuth2User, Role.USER));
		redirect(request, response);
	}

	private void redirect(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String url = UriComponentsBuilder.fromUriString("")
			.build().toUriString();
		getRedirectStrategy().sendRedirect(request, response, url);
	}

	private String loginByOAuth2(Authentication authentication) {
		return jwtTokenProvider.createAccessToken(authentication);
	}
}