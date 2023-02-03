package com.project.Tamago.exception.exceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.Tamago.exception.UserException;

@RestControllerAdvice
public class ControllerAdvice {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(IllegalArgumentException.class)
	public ErrorMessage illegalArgumentExceptionHandler(IllegalArgumentException exception) {
		return new ErrorMessage(HttpStatus.BAD_REQUEST.value(), "인자값을 잘못 입력하셨습니다.", false);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(UserException.class)
	public ErrorMessage userExceptionHandler(UserException exception) {
		return new ErrorMessage(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), false);
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public ErrorMessage exceptionHandler(Exception exception) {
		exception.printStackTrace();
		return new ErrorMessage(HttpStatus.BAD_REQUEST.value(), "예상하지 못한 오류가 발생하였습니다. 서버에 문의해주세요", false);
	}
}
