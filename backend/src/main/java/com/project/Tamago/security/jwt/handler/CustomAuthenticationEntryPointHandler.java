package com.project.Tamago.security.jwt.handler;

import static com.project.Tamago.common.enums.ResponseStatus.*;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.project.Tamago.common.enums.ResponseStatus;

public class CustomAuthenticationEntryPointHandler implements AuthenticationEntryPoint {
	private final ResponseStatus[] responseStatuses = {EMPTY_JWT, EXPIRED_JWT, INVALID_JWT, INVALID_SIGNATURE};

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException,
		ServletException {
		String exception = String.valueOf(request.getAttribute("exception"));

		ResponseStatus responseStatus = Arrays.stream(responseStatuses)
			.filter(ec -> exception.equals(ec.getCode() + ""))
			.findFirst()
			.orElse(null);

		if (responseStatus != null) {
			setResponse(response, responseStatus);
		}
		if (exception.isEmpty()) {
			setResponse(response, EMPTY_JWT);
		}
	}

	private void setResponse(HttpServletResponse response, ResponseStatus responseStatus) throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("{" + "\"code\":\"" + responseStatus.getCode() + "\","
			+ "\"description\":\"" + responseStatus.getDescription() + "\"}");
		response.getWriter().flush();
	}
}
