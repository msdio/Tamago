package com.project.Tamago.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"code", "description", "result"})
public class CustomResponse<T> {
	private int code = 1000;
	private String description = "응답 성공";

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private T result;

	public CustomResponse(T result) {
		this.result = result;
	}

	public CustomResponse() {
	}
}
