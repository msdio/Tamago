package com.project.tamago.common.exception.exceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.tamago.common.enums.ResponseCode;

import lombok.Data;

@Data
public class ErrorMessage {
	private int code;
	private String description;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonProperty("errors")
	private List<String> errors;

	public ErrorMessage(ResponseCode responseCode) {
		this.code = responseCode.getCode();
		this.description = responseCode.getDescription();
	}

	public ErrorMessage(ResponseCode responseCode, Errors errors) {
		this(responseCode);
		setCustomFieldErrors(errors.getFieldErrors());
	}

	private void setCustomFieldErrors(List<FieldError> fieldErrors) {
		errors = fieldErrors.stream()
			.map(DefaultMessageSourceResolvable::getDefaultMessage)
			.collect(Collectors.toList());
	}
}
