package com.project.tamago.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.tamago.view.BadgeView;

@Controller
public class BadgeController {

	@GetMapping("/badge")
	@ResponseBody
	public ResponseEntity<byte[]> getSvg(@RequestParam String userName) {

		HttpHeaders header = new HttpHeaders();
		header.add("Content-Type", "image/svg+xml");

		return ResponseEntity.ok()
			.headers(header)
			.body(new BadgeView(userName).getBadgeFileByte());
	}

}
