package com.project.tamago.configuration.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:9000", "https://typingmastergo.site", "https://prod.typingmastergo.site",
			"https://camo.githubusercontent.com"));
		configuration.addAllowedHeader("*");
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
		configuration.setAllowCredentials(true);

		source.registerCorsConfiguration("/**", configuration);
		return new CorsFilter(source);
	}
}
