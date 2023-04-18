package com.project.Tamago.security.jwt;

import static com.project.Tamago.common.enums.AlarmLevel.*;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import com.project.Tamago.common.annotation.SlackAlarm;
import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.common.exception.exceptionHandler.ErrorMessage;
import com.project.Tamago.common.logger.RequestStorage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate<String, Object> redisTemplate;
	private final RequestStorage requestStorage;

	@Override
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
		throws IOException, ServletException {
		ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
		requestStorage.set(wrappedRequest);
		String token = jwtTokenProvider.resolveToken(wrappedRequest);

		if (!StringUtils.hasText(token)) {
			wrappedRequest.setAttribute("exception", "");
			chain.doFilter(wrappedRequest, response);
			return;
		}
		try {
			jwtTokenProvider.validateAccessToken(token);
			String isLogout = (String)redisTemplate.opsForValue().get(token);
			if (ObjectUtils.isEmpty(isLogout)) {

				Authentication authentication = jwtTokenProvider.getAuthenticationFromAcs(token);
				String userId = authentication.getName();
				SecurityContextHolder.getContext().setAuthentication(authentication);

				wrappedRequest.setAttribute("userId", userId);
			}
		} catch (CustomException e) {
			wrappedRequest.setAttribute("exception", e.getErrorCode().getCode());
		}
		chain.doFilter(wrappedRequest, response);
	}
}
