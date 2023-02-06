package com.project.Tamago.exception.exceptionHandler;

import lombok.Data;

@Data
public class ErrorMessage {
	private int code;
	private String description;

	ErrorMessage(ErrorCode errorCode) {
		this.code = errorCode.getCode();
		this.description = errorCode.getDescription();
	}
}
