package com.project.Tamago.security.jwt;

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

import com.project.Tamago.common.exception.CustomException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate<String, Object> redisTemplate;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
		throws IOException, ServletException {
		String token = jwtTokenProvider.resolveToken(request);

		if (!StringUtils.hasText(token)) {
			request.setAttribute("exception", "");
			chain.doFilter(request, response);
			return;
		}
		try {
			jwtTokenProvider.validateAccessToken(token);
			String isLogout = (String)redisTemplate.opsForValue().get(token);
			if (ObjectUtils.isEmpty(isLogout)) {

				Authentication authentication = jwtTokenProvider.getAuthenticationFromAcs(token);
				String userId = authentication.getName();
				SecurityContextHolder.getContext().setAuthentication(authentication);

				request.setAttribute("userId", userId);
			}
		} catch (CustomException e) {
			request.setAttribute("exception", e.getErrorCode().getCode());
		}
		chain.doFilter(request, response);
	}
}
