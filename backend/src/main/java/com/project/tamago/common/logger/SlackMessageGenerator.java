package com.project.tamago.common.logger;

import static com.project.tamago.common.Constant.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;

import com.project.tamago.common.enums.AlarmLevel;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SlackMessageGenerator {
	private final Environment environment;

	public String generateSlackErrorMessage(ContentCachingRequestWrapper request, Exception exception,
		AlarmLevel level) {
		try {
			String currentTime = getCurrentTime();
			String userId = (String)request.getAttribute("userId");
			String method = request.getMethod();
			String exceptionMessage = extractExceptionMessage(exception, level);
			String requestURI = request.getRequestURI();
			String body = getBody(request);
			String ip = request.getHeader("X-Forwarded-For");
			if (ip != null && !ip.isBlank()) {
				ip = ip.split(",")[0].trim();
			} else {
				ip = request.getRemoteAddr();
			}
			return toMessage(currentTime, userId, ip,
				exceptionMessage, method, requestURI, body);
		} catch (Exception e) {
			return String.format(EXTRACTION_ERROR_MESSAGE, e.getMessage());
		}
	}

	private String getCurrentTime() {
		return LocalDateTime.now().toString();
	}

	private String extractRequestHeaders(ContentCachingRequestWrapper request) {
		Map<String, String> headers = new HashMap<>();
		StringJoiner headerJoiner = new StringJoiner("\n");

		for (String headerName : Collections.list(request.getHeaderNames())) {
			headers.put(headerName, request.getHeader(headerName));
		}
		for (Map.Entry<String, String> header : headers.entrySet()) {
			headerJoiner.add(header.getKey() + ":" + header.getValue());
		}
		return headerJoiner.toString();
	}

	private String getBody(ContentCachingRequestWrapper request) {
		String body = new String(request.getContentAsByteArray());
		if (body.isEmpty()) {
			body = EMPTY_BODY_MESSAGE;
		}
		return body;
	}

	private String extractExceptionMessage(Exception e, AlarmLevel level) {
		StackTraceElement stackTrace = e.getStackTrace()[0];
		String message = e.getMessage();

		if (Objects.isNull(message)) {
			return Arrays.stream(e.getStackTrace())
				.map(StackTraceElement::toString)
				.collect(Collectors.joining("\n"));
		}

		return String.format(EXCEPTION_MESSAGE_FORMAT, level.name(), stackTrace.getClassName(),
			stackTrace.getMethodName(), stackTrace.getLineNumber(), message);
	}

	private String toMessage(String currentTime, String userId, String ip, String errorMessage,
		String method, String requestURI, String body) {
		return String.format(
			SLACK_MESSAGE_FORMAT, currentTime, userId, ip,
			errorMessage, method, requestURI, body
		);
	}
}

