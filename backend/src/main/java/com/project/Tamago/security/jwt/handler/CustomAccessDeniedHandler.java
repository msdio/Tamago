package com.project.Tamago.security.jwt.handler;

import static com.project.Tamago.common.enums.ResponseCode.*;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
	@Override
	public void handle(
		HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws
		IOException,
		ServletException {
		log.info(INVALID_USER_JWT.getDescription());
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("{" + "\"isSuccess\":false, "
			+ "\"code\":\"" + INVALID_USER_JWT.getCode() + "\","
			+ "\"description\":\"" + INVALID_USER_JWT.getDescription() + "\"}");
		response.getWriter().flush();
	}
}
