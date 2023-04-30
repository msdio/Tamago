package com.project.tamago.common.exception;

import com.project.tamago.common.enums.ResponseCode;

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
