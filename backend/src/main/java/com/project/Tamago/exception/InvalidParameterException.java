package com.project.Tamago.exception;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import org.springframework.validation.Errors;

public class InvalidParameterException extends CustomException {

	private final Errors errors;

	public InvalidParameterException(Errors errors) {
		super(INVALID_PARAMETER);
		this.errors = errors;
	}

	public Errors getErrors() {
		return this.errors;
	}
}
