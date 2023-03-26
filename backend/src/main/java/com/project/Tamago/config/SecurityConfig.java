package com.project.Tamago.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.project.Tamago.security.jwt.JwtAuthorizationFilter;
import com.project.Tamago.security.jwt.JwtTokenProvider;
import com.project.Tamago.security.jwt.handler.CustomAccessDeniedHandler;
import com.project.Tamago.security.jwt.handler.CustomAuthenticationEntryPointHandler;
import com.project.Tamago.security.oauth2.CustomOAuth2UserService;
import com.project.Tamago.security.oauth2.OAuth2AuthenticationSuccessHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

	private final CorsConfig corsConfig;
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate<String, Object> redisTemplate;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

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
			.headers()
			.frameOptions()
			.sameOrigin();
		http
			.authorizeRequests()
			// swagger
			.antMatchers("/typing/history").authenticated()
			.antMatchers("/typing/register").authenticated()
			.antMatchers("/statistics/**").permitAll()
			.antMatchers("/oauth2/**").permitAll()
			.antMatchers("/auth/**").permitAll()
			.antMatchers("/test/**").permitAll()
			.antMatchers("/swagger-ui/**").permitAll()
			.antMatchers("/swagger-ui.html").permitAll()
			.antMatchers("/swagger/**").permitAll()
			.antMatchers("/swagger-resources/**").permitAll()
			.antMatchers("/v2/api-docs").permitAll()
			.antMatchers("/health").permitAll()
			.antMatchers("/h2-console/**").permitAll()
			.antMatchers("/typing/**").permitAll()
			.and()
			.authorizeRequests()
			.anyRequest().authenticated();

		http.oauth2Login()
			.userInfoEndpoint().userService(customOAuth2UserService)
			.and()
			.successHandler(oAuth2AuthenticationSuccessHandler)
			.permitAll();

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

}
