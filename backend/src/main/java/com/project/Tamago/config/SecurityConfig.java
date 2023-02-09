package com.project.Tamago.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

	private final CorsConfig corsConfig;

	@Bean
	public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {

		http
			.csrf().disable()
			.formLogin().disable()
			.httpBasic().disable();
		http
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http
			.addFilter(corsConfig.corsFilter());
		http
			.authorizeRequests()
			// swagger
			.antMatchers("/auth/**").permitAll()
			.antMatchers("/swagger-ui/**").permitAll()
			.antMatchers("/swagger-ui.html").permitAll()
			.antMatchers("/swagger/**").permitAll()
			.antMatchers("/swagger-resources/**").permitAll()
			.antMatchers("/v2/api-docs").permitAll()
			.antMatchers("/health").permitAll()
			.and()
			.authorizeRequests()
			.anyRequest().permitAll();

		return http.build();
	}
}
