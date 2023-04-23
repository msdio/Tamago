package com.project.Tamago.configuration.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.project.Tamago.common.logger.RequestStorage;
import com.project.Tamago.configuration.resolver.IpAddressResolver;
import com.project.Tamago.configuration.resolver.LoginArgumentResolver;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {
	private final LoginArgumentResolver loginArgumentResolver;
	private final IpAddressResolver ipAddressResolver;

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(loginArgumentResolver);
		resolvers.add(ipAddressResolver);
	}
}