package com.project.Tamago.exception.exceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.Tamago.exception.CustomException;

@RestControllerAdvice
public class ControllerAdvice {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(IllegalArgumentException.class)
	public ErrorMessage illegalArgumentExceptionHandler(IllegalArgumentException exception) {
		return new ErrorMessage(ErrorCode.INVALID_INPUT_VALUE);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CustomException.class)
	public ErrorMessage customExceptionHandler(CustomException exception) {
		ErrorCode errorCode = exception.getErrorCode();
		return new ErrorMessage(errorCode);
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public ErrorMessage exceptionHandler(Exception exception) {
		exception.printStackTrace();
		return new ErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR);
	}
}
