package com.project.Tamago.exception;

import com.project.Tamago.exception.exceptionHandler.ErrorCode;

public class CustomException extends RuntimeException {

	private ErrorCode errorCode;

	public CustomException(ErrorCode errorCode) {
		super(errorCode.getDescription());
		this.errorCode = errorCode;
	}

	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
