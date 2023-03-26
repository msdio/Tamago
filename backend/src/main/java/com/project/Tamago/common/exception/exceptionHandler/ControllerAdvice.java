package com.project.Tamago.common.exception.exceptionHandler;

import static com.project.Tamago.common.enums.ResponseStatus.*;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.common.exception.InvalidParameterException;
import com.project.Tamago.common.enums.ResponseStatus;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidParameterException.class)
	protected ErrorMessage invalidParameterExceptionHandler(InvalidParameterException exception) {
		ResponseStatus responseStatus = exception.getErrorCode();
		log.error(responseStatus.getDescription());
		return new ErrorMessage(responseStatus, exception.getErrors());
	}

	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MissingServletRequestParameterException.class)
	protected ErrorMessage nullParameterExceptionHandler(MissingServletRequestParameterException exception) {
		log.error("파라미터 {}가 존재하지 않습니다", exception.getParameterName());
		return new ErrorMessage(NULL_PARAMETER);
	}

	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(IllegalArgumentException.class)
	public ErrorMessage illegalArgumentExceptionHandler(IllegalArgumentException exception) {
		log.error(INVALID_INPUT_VALUE.getDescription());
		return new ErrorMessage(INVALID_INPUT_VALUE);
	}

	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InternalAuthenticationServiceException.class)
	public ErrorMessage illegalArgumentExceptionHandler(InternalAuthenticationServiceException exception) {
		log.error(USERS_EMPTY_USER_EMAIL.getDescription());
		return new ErrorMessage(USERS_EMPTY_USER_EMAIL);
	}

	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BadCredentialsException.class)
	public ErrorMessage illegalArgumentExceptionHandler(BadCredentialsException exception) {
		log.error(USERS_EXISTS_PASSWORD.getDescription());
		return new ErrorMessage(USERS_EXISTS_PASSWORD);
	}

	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CustomException.class)
	public ErrorMessage customExceptionHandler(CustomException exception) {
		ResponseStatus responseStatus = exception.getErrorCode();
		log.error(responseStatus.getDescription());
		return new ErrorMessage(responseStatus);
	}


	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ErrorMessage customExceptionHandler(HttpMessageNotReadableException exception) {
		log.error(INVALID_PARAMETER.getDescription());
		return new ErrorMessage(INVALID_PARAMETER);
	}


	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorMessage customExceptionHandler(MethodArgumentNotValidException exception) {
		log.error(INVALID_PARAMETER.getDescription());
		return new ErrorMessage(INVALID_PARAMETER);
	}

	@org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public ErrorMessage exceptionHandler(Exception exception) {
		log.error(Arrays.stream(exception.getStackTrace())
			.map(StackTraceElement::toString)
			.map(toString -> toString + "\n")
			.collect(Collectors.joining()));
		return new ErrorMessage(ResponseStatus.INTERNAL_SERVER_ERROR);
	}
}
