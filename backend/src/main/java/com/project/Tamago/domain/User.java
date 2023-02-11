package com.project.Tamago.domain;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.Tamago.util.constants.Role;
import com.project.Tamago.util.converter.RoleConverter;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(length = 10, nullable = false, unique = true)
	@Size(max = 10)
	private String nickname;

	@Size(max = 20)
	private String introduce;

	private String profileImg;

	@ColumnDefault("true")
	private Boolean terms;

	@ColumnDefault("true")
	private Boolean status;

	@ColumnDefault("'none'")
	private String provider;

	private String providerId;

	@Convert(converter = RoleConverter.class)
	private Role role;

	public void encodePassword(PasswordEncoder passwordEncoder, String password) {
		this.password = passwordEncoder.encode(password);
	}
}
