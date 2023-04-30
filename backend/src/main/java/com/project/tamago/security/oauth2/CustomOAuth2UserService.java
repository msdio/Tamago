package com.project.tamago.security.oauth2;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2UserService
	implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		return OAuthAttributes.of(getRegistrationId(userRequest), getUserNameAttributeName(userRequest),
			getLoadOAuth2UserAttributes(userRequest));
	}

	private Map<String, Object> getLoadOAuth2UserAttributes(OAuth2UserRequest userRequest) {
		return new DefaultOAuth2UserService().loadUser(userRequest).getAttributes();
	}

	private String getRegistrationId(OAuth2UserRequest userRequest) {
		return userRequest.getClientRegistration().getRegistrationId();
	}

	private String getUserNameAttributeName(OAuth2UserRequest userRequest) {
		return userRequest.getClientRegistration()
			.getProviderDetails()
			.getUserInfoEndpoint()
			.getUserNameAttributeName();
	}
}