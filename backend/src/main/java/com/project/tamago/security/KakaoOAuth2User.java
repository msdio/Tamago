package com.project.tamago.security;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import lombok.Builder;

@Builder
public class KakaoOAuth2User implements CustomOAuth2User{

	private String registrationId;
	private String email;
	private String nameAttributeKey;
	private Map<String, Object> attributes;
	private Set<GrantedAuthority> authorities;
	private String name;


	@Override
	public String getOAuth2Id() {
		return registrationId;
	}

	@Override
	public String getEmail() {
		return email;
	}

	@Override
	public String getNickname() {
		return null;
	}

	@Override
	public String getNameAttributeKey() {
		return nameAttributeKey;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
