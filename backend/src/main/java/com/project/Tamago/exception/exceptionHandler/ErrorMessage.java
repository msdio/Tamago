package com.project.Tamago.exception.exceptionHandler;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorMessage {

	private int code;
	private String message;
	private boolean isSuccess;
}
