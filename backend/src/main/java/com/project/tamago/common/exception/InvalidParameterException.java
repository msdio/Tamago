package com.project.tamago.common.exception;

import static com.project.tamago.common.enums.ResponseCode.*;

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
