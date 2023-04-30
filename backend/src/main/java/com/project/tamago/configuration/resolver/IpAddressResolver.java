package com.project.tamago.configuration.resolver;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class IpAddressResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().equals(String.class) &&
			parameter.hasParameterAnnotation(com.project.tamago.common.annotation.Ip.class);
	}

	@Override
	public String resolveArgument(
		MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
		HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
		String ip = request.getHeader("X-Forwarded-For");
		if (ip != null && !ip.isBlank()) {
			return ip.split(",")[0].trim();
		}
		return request.getRemoteAddr();
	}
}
