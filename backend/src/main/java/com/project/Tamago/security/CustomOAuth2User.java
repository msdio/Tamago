package com.project.Tamago.security;

import org.springframework.security.oauth2.core.user.OAuth2User;

public interface CustomOAuth2User extends OAuth2User {
	String getOAuth2Id();
	String getEmail();
	String getNickname();
	String getNameAttributeKey();

}
