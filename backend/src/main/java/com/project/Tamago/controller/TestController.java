package com.project.Tamago.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.exception.CustomException;

@RestController
public class TestController {

	@GetMapping("/test")
	public String test(@RequestParam String str) {

		if(str.contains("Illegal")){
			throw new IllegalArgumentException();
		} else if (str.contains("user")) {
			throw new CustomException("잘못된 접근입니다.");
		} else if (str.contains("error")) {
			throw new RuntimeException();
		}

		return "Success";
	}
}
