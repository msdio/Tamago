package com.project.Tamago.dto;

import com.project.Tamago.security.Token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


public interface LoginDto {
	String getAccessToken();
	String getNickname();
}
