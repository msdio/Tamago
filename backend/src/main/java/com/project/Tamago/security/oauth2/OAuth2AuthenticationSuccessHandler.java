package com.project.Tamago.security.oauth2;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.project.Tamago.common.enums.Role;
import com.project.Tamago.domain.User;
import com.project.Tamago.dto.mapper.DataMapper;
import com.project.Tamago.repository.UserRepository;
import com.project.Tamago.security.CustomOAuth2User;
import com.project.Tamago.security.KakaoOAuth2User;
import com.project.Tamago.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	private final UserRepository userRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final String URL = "https://typingmastergo.site/kakao-redirect?token=%s&userId=%s";

	@Override
	@Transactional
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		// processRegisterAndLogin(response, authentication, (CustomOAuth2User)authentication.getPrincipal());
		processRegisterOrLogin(request, response, authentication, (CustomOAuth2User)authentication.getPrincipal());
	}

	private void processRegisterAndLogin(HttpServletResponse response,
		Authentication authentication,
		CustomOAuth2User oAuth2User) throws IOException {

		User user = userRepository.findByEmailAndProvider(oAuth2User.getEmail(), oAuth2User.getOAuth2Id())
			.orElseGet(() -> userRepository.save(getUserByOAuth2User(oAuth2User)));
		((KakaoOAuth2User)authentication.getPrincipal()).setName(user.getId().toString());
		response.getWriter().write(loginByOAuth2(authentication));
	}

	/**
	 * 프론트엔드에서 추가로 정보 등록하는 폼이나 창이 필요할 경우
	 */
	private void processRegisterOrLogin(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication,
		CustomOAuth2User oAuth2User) throws IOException {
		User user = userRepository.findByEmailAndProvider(oAuth2User.getEmail(), oAuth2User.getOAuth2Id())
			.orElseGet(() -> userRepository.save(getUserByOAuth2User(oAuth2User)));

		((KakaoOAuth2User)authentication.getPrincipal()).setName(user.getId().toString());
		redirect(request, response, loginByOAuth2(authentication), user.getId());
	}

	private static User getUserByOAuth2User(CustomOAuth2User oAuth2User) {
		return DataMapper.INSTANCE.toUser(oAuth2User, Role.USER, UUID.randomUUID().toString().substring(0, 10));
	}

	private void redirect(HttpServletRequest request, HttpServletResponse response, String token, Integer userId) throws
		IOException {
		String url = UriComponentsBuilder.fromUriString(String.format(URL, token, userId))
			.build().toUriString();
		getRedirectStrategy().sendRedirect(request, response, url);
	}

	private String loginByOAuth2(Authentication authentication) {
		return jwtTokenProvider.createAccessToken(authentication);
	}
}