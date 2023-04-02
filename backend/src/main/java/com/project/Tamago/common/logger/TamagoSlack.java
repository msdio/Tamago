package com.project.Tamago.common.logger;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TamagoSlack {

	private final ObjectMapper objectMapper;
	@Value("${logging.slack.webhook-uri}")
	private String SLACK_LOGGER_WEBHOOK_URI;


	public void send(String message) {
		WebClient.create(SLACK_LOGGER_WEBHOOK_URI)
			.post()
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(toJson(message))
			.retrieve()
			.bodyToMono(String.class)
			.subscribe();
	}

	private String toJson(String message) {
		try {
			Map<String, String> values = new HashMap<>();
			values.put("text", message);
			return objectMapper.writeValueAsString(values);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Failed to serialize message to JSON", e);
		}
	}
}
