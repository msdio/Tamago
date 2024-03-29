package com.project.tamago.configuration.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.RequestContextFilter;

import com.project.tamago.common.logger.RequestStorage;
import com.project.tamago.common.logger.SlackAppender;
import com.project.tamago.security.jwt.JwtAuthorizationFilter;
import com.project.tamago.security.jwt.JwtTokenProvider;
import com.project.tamago.security.jwt.handler.CustomAccessDeniedHandler;
import com.project.tamago.security.jwt.handler.CustomAuthenticationEntryPointHandler;
import com.project.tamago.security.oauth2.CustomOAuth2UserService;
import com.project.tamago.security.oauth2.OAuth2AuthenticationSuccessHandler;

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
	private final RequestStorage requestStorage;
	private final SlackAppender slackAppender;
	@Bean
	public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {

		http
			.addFilterBefore(new RequestContextFilter(), ChannelProcessingFilter.class)
			.addFilterBefore(new JwtAuthorizationFilter(jwtTokenProvider, redisTemplate, requestStorage),
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
			.authenticationEntryPoint(new CustomAuthenticationEntryPointHandler(slackAppender))
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
			.antMatchers("/typing/exam").authenticated()
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
			.antMatchers("/badge").permitAll()
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
