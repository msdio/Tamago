package com.project.Tamago.common.exception.exceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.Tamago.common.enums.ResponseStatus;

import lombok.Data;

@Data
public class ErrorMessage {
	private int code;
	private String description;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonProperty("errors")
	private List<String> errors;

	public ErrorMessage(ResponseStatus responseStatus) {
		this.code = responseStatus.getCode();
		this.description = responseStatus.getDescription();
	}

	public ErrorMessage(ResponseStatus responseStatus, Errors errors) {
		this(responseStatus);
		setCustomFieldErrors(errors.getFieldErrors());
	}

	private void setCustomFieldErrors(List<FieldError> fieldErrors) {
		errors = fieldErrors.stream()
			.map(DefaultMessageSourceResolvable::getDefaultMessage)
			.collect(Collectors.toList());
	}
}
