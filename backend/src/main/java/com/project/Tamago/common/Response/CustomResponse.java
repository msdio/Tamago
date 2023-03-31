package com.project.Tamago.common.Response;

import static com.project.Tamago.common.enums.ResponseCode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"code", "description", "result"})
public class CustomResponse<T> {
	private int code = SUCCESS.getCode();
	private String description = SUCCESS.getDescription();

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private T result;

	public CustomResponse(T result) {
		this.result = result;
	}

	public CustomResponse() {
		this.result = null;
	}
}
