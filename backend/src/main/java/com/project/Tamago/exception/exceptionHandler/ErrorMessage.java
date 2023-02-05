package com.project.Tamago.exception.exceptionHandler;

import lombok.Data;

@Data
public class ErrorMessage {

	private int status;
	private String code;
	private String description;

	ErrorMessage(ErrorCode errorCode) {
		this.status = errorCode.getStatus();
		this.code = errorCode.getCode();
		this.description = errorCode.getDescription();
	}
}
