package com.project.Tamago.config;

import static com.project.Tamago.common.enums.ResponseStatus.*;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.project.Tamago.common.annotation.UserId;
import com.project.Tamago.common.exception.CustomException;

@Component
public class LoginArgumentResolver implements HandlerMethodArgumentResolver {
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().equals(Integer.class) &&
			parameter.hasParameterAnnotation(UserId.class);
	}

	@Override
	public Object resolveArgument(
		MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
		return Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
	}
}
