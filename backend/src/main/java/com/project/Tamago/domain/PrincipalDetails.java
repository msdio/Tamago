package com.project.Tamago.domain;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrincipalDetails implements UserDetails {
	private Integer userId;
	private String nickName;
	private String password;
	private String role;

	public static UserDetails of(User user) {
		return PrincipalDetails.builder()
			.userId(user.getId())
			.nickName(user.getNickname())
			.password(user.getPassword())
			.role(user.getRole().getType())
			.build();
	}

	public Integer getUserId() {
		return userId;
	}

	@Override
	public String getUsername() {
		return nickName;
	}

	@Override
	public String getPassword() {
		return password;
	}

	//계정이 만료되지 않았는지 리턴 (true: 만료안됨)
	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return true;
	}

	//계정이 잠겨있는지 않았는지 리턴. (true:잠기지 않음)
	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return true;
	}

	//비밀번호가 만료되지 않았는지 리턴한다. (true:만료안됨)
	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return true;
	}

	//계정이 활성화(사용가능)인지 리턴 (true:활성화)
	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return true;
	}

	//계정이 갖고 있는 권한 목록은 리턴
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		Collection<GrantedAuthority> collectors = new ArrayList<>();
		collectors.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return role;
			}
		});
		return collectors;
	}
}
