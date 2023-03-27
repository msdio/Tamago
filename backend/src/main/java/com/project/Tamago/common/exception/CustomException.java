package com.project.Tamago.common.exception;

import com.project.Tamago.common.enums.ResponseCode;

public class CustomException extends RuntimeException {

	private ResponseCode responseCode;

	public CustomException(ResponseCode responseCode) {
		super(responseCode.getDescription());
		this.responseCode = responseCode;
	}

	public ResponseCode getErrorCode() {
		return responseCode;
	}
}
