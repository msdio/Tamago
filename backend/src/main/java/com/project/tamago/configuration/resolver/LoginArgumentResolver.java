package com.project.tamago.configuration.resolver;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.project.tamago.dto.LoginResolverDto;

@Component
public class LoginArgumentResolver implements HandlerMethodArgumentResolver {
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().equals(LoginResolverDto.class) &&
			parameter.hasParameterAnnotation(com.project.tamago.common.annotation.Login.class);
	}

	@Override
	public Object resolveArgument(
		MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		return new LoginResolverDto(userId);
	}
}
