package com.project.tamago.security.oauth2;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.project.tamago.common.enums.Role;
import com.project.tamago.security.CustomOAuth2User;
import com.project.tamago.security.GoogleOAuth2User;
import com.project.tamago.security.KakaoOAuth2User;

import lombok.Getter;

@Getter
public class OAuthAttributes {

	public static CustomOAuth2User of(String registrationId,
		String userNameAttributeName,
		Map<String, Object> attributes) {

		if ("kakao".equals(registrationId)) {
			return ofKakao(userNameAttributeName, attributes, registrationId);
		}
		return ofGoogle(userNameAttributeName, attributes, registrationId);
	}

	private static GoogleOAuth2User ofGoogle(String userNameAttributeName,
		Map<String, Object> attributes, String registrationId) {
		return GoogleOAuth2User
			.builder()
			.registrationId(registrationId)
			.email((String)attributes.get("email"))
			.nameAttributeKey(userNameAttributeName)
			.attributes(attributes)
			.authorities(Collections.singleton(new SimpleGrantedAuthority(Role.USER.name())))
			.name((String)attributes.get("name"))
			.nickName(UUID.randomUUID().toString())
			.build();
	}

	private static KakaoOAuth2User ofKakao(String userNameAttributeName,
		Map<String, Object> attributes, String registrationId) {
		Map<String, Object> properties = (Map<String, Object>)attributes.get("properties");
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");

		if (!properties.containsKey("nickname") || !kakaoAccount.containsKey("email"))
			throw new RuntimeException("클라이언트가 권한을 허락하지 않았습니다.");
		return KakaoOAuth2User
			.builder()
			.registrationId(registrationId)
			.email((String)kakaoAccount.get("email"))
			.nameAttributeKey(userNameAttributeName)
			.attributes(attributes)
			.authorities(Collections.singleton(new SimpleGrantedAuthority(Role.USER.getType())))
			.name((String)properties.get("nickname"))
			.build();
	}
}