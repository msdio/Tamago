package com.project.Tamago.exception.exceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ErrorMessage {
	private int code;
	private String description;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonProperty("errors")
	private List<String> errors;

	public ErrorMessage(ErrorCode errorCode) {
		this.code = errorCode.getCode();
		this.description = errorCode.getDescription();
	}

	public ErrorMessage(ErrorCode errorCode, Errors errors) {
		this(errorCode);
		setCustomFieldErrors(errors.getFieldErrors());
	}

	private void setCustomFieldErrors(List<FieldError> fieldErrors) {
		errors = fieldErrors.stream()
			.map(DefaultMessageSourceResolvable::getDefaultMessage)
			.collect(Collectors.toList());
	}
}
