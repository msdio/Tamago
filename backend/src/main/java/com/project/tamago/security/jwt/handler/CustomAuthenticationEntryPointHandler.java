package com.project.tamago.security.jwt.handler;

import static com.project.tamago.common.enums.ResponseCode.*;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.project.tamago.common.enums.ResponseCode;
import com.project.tamago.common.exception.CustomException;
import com.project.tamago.common.logger.SlackAppender;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPointHandler implements AuthenticationEntryPoint {
	private final ResponseCode[] responseCodes = {EMPTY_JWT, EXPIRED_JWT, INVALID_JWT, INVALID_SIGNATURE};
	private final SlackAppender slackAppender;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException, ServletException {
		String exception = String.valueOf(request.getAttribute("exception"));
		ResponseCode responseCode = Arrays.stream(responseCodes)
			.filter(ec -> exception.equals(ec.getCode() + ""))
			.findFirst()
			.orElse(null);

		if (responseCode != null) {
			setResponse(response, responseCode);
			slackAppender.appendExceptionToSlack(new CustomException(responseCode));
		}
		if (exception.isEmpty()) {
			setResponse(response, EMPTY_JWT);
			slackAppender.appendExceptionToSlack(new CustomException(EMPTY_JWT));
		}
	}
	private void setResponse(HttpServletResponse response, ResponseCode responseCode) throws IOException {
		log.error(responseCode.getDescription());
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("{" + "\"code\":\"" + responseCode.getCode() + "\","
			+ "\"description\":\"" + responseCode.getDescription() + "\"}");
		response.getWriter().flush();
	}
}
