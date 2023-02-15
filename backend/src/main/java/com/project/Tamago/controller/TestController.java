package com.project.Tamago.controller;

import static com.project.Tamago.exception.exceptionHandler.ErrorCode.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.exception.CustomException;

@RestController
public class TestController {

	@GetMapping("/test")
	public String test(@RequestParam String str) {
		if (str.contains("Illegal")) {
			throw new IllegalArgumentException();
		} else if (str.contains("user")) {
			throw new CustomException(INVALID_INPUT_VALUE);
		} else if (str.contains("error")) {
			throw new RuntimeException();
		}

		return "Success";
	}
}
