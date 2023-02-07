package com.project.Tamago.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.project.Tamago.jwt.JwtAuthorizationFilter;
import com.project.Tamago.jwt.JwtTokenProvider;
import com.project.Tamago.jwt.handler.CustomAccessDeniedHandler;
import com.project.Tamago.jwt.handler.CustomAuthenticationEntryPointHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

	private final CorsConfig corsConfig;
	private final RedisTemplate<String, Object> redisTemplate;
	private final JwtTokenProvider jwtTokenProvider;

	@Bean
	public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {

		http
			.addFilterBefore(new JwtAuthorizationFilter(jwtTokenProvider, redisTemplate),
				UsernamePasswordAuthenticationFilter.class);
		http
			.csrf().disable()
			.formLogin().disable()
			.httpBasic().disable();
		http
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http
			.addFilter(corsConfig.corsFilter())
			.exceptionHandling()
			.authenticationEntryPoint(new CustomAuthenticationEntryPointHandler())
			.accessDeniedHandler(new CustomAccessDeniedHandler());
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
			.anyRequest().authenticated();

		return http.build();
	}
}
