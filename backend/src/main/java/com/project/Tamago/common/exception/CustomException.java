package com.project.Tamago.common.exception;

import com.project.Tamago.common.enums.ResponseStatus;

public class CustomException extends RuntimeException {

	private ResponseStatus responseStatus;

	public CustomException(ResponseStatus responseStatus) {
		super(responseStatus.getDescription());
		this.responseStatus = responseStatus;
	}

	public ResponseStatus getErrorCode() {
		return responseStatus;
	}
}
