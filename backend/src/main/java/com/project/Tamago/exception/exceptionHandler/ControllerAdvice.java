package com.project.Tamago.exception.exceptionHandler;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.Tamago.exception.CustomException;
import com.project.Tamago.exception.InvalidParameterException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidParameterException.class)
	protected ErrorMessage invalidParameterExceptionHandler(InvalidParameterException exception) {
		ErrorCode errorCode = exception.getErrorCode();
		log.error(errorCode.getDescription());
		return new ErrorMessage(errorCode, exception.getErrors());
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MissingServletRequestParameterException.class)
	protected ErrorMessage nullParameterExceptionHandler(MissingServletRequestParameterException exception) {
		log.error("파라미터 {}가 존재하지 않습니다", exception.getParameterName());
		return new ErrorMessage(NULL_PARAMETER);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(IllegalArgumentException.class)
	public ErrorMessage illegalArgumentExceptionHandler(IllegalArgumentException exception) {
		log.error(INVALID_INPUT_VALUE.getDescription());
		return new ErrorMessage(INVALID_INPUT_VALUE);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CustomException.class)
	public ErrorMessage customExceptionHandler(CustomException exception) {
		ErrorCode errorCode = exception.getErrorCode();
		log.error(errorCode.getDescription());
		return new ErrorMessage(errorCode);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorMessage customExceptionHandler(MethodArgumentNotValidException exception) {
		log.error(INVALID_PARAMETER.getDescription());
		return new ErrorMessage(INVALID_PARAMETER);
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public ErrorMessage exceptionHandler(Exception exception) {
		log.error(Arrays.stream(exception.getStackTrace())
			.map(StackTraceElement::toString)
			.map(toString -> toString + "\n")
			.collect(Collectors.joining()));
		return new ErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR);
	}
}
