package com.project.Tamago.jwt.handler;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.project.Tamago.exception.exceptionHandler.ErrorCode;

public class CustomAuthenticationEntryPointHandler implements AuthenticationEntryPoint {
	private final ErrorCode[] errorCodes = {EMPTY_JWT, EXPIRED_JWT, INVALID_JWT};

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException,
		ServletException {
		String exception = String.valueOf(request.getAttribute("exception"));

		ErrorCode errorCode = Arrays.stream(errorCodes)
			.filter(ec -> exception.equals(ec.getCode() + ""))
			.findFirst()
			.orElse(null);

		if (errorCode != null) {
			setResponse(response, errorCode);
		}
		if (exception.isEmpty()) {
			setResponse(response, EMPTY_JWT);
		}
	}

	private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("{" + "\"code\":\"" + errorCode.getCode() + "\","
			+ "\"description\":\"" + errorCode.getDescription() + "\"}");
		response.getWriter().flush();
	}
}
