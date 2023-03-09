package com.project.Tamago.controller;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.dto.CustomResponse;
import com.project.Tamago.dto.responseDto.StatisticsAllResDto;
import com.project.Tamago.repository.TypingHistoryRepository;
import com.project.Tamago.service.StatisticService;
import com.project.Tamago.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticController {

	private final StatisticService statisticService;
	private final TypingHistoryRepository typingHistoryRepository;
	private final UserService userService;

	@GetMapping("/all")
	@Transactional
	public CustomResponse<StatisticsAllResDto> findUserStatistic(@RequestHeader("Authorization") String jwtToken) {
		return new CustomResponse<>(statisticService.totalStatisticsAll(userService.getUserByJwtToken(jwtToken)));
	}
}
