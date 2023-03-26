package com.project.Tamago.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.Response.CustomResponse;
import com.project.Tamago.dto.responseDto.DateAccuracyAverageResDto;
import com.project.Tamago.dto.responseDto.DateWpmAverageResDto;
import com.project.Tamago.dto.responseDto.StatisticsAllResDto;
import com.project.Tamago.service.StatisticService;
import com.project.Tamago.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticController {

	private final StatisticService statisticService;
	private final UserService userService;

	@GetMapping("/all")
	public CustomResponse<StatisticsAllResDto> findUserStatistic(@RequestHeader("Authorization") String jwtToken) {
		return new CustomResponse<>(statisticService.totalStatisticsAll(userService.getUserByJwtToken(jwtToken)));
	}

	@GetMapping("/speed")
	public CustomResponse<DateWpmAverageResDto> findDateAverageWpm(
		@RequestHeader("Authorization") String jwtToken,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findWpmAverageByUser(userService.getUserByJwtToken(jwtToken), startDay, endDay));
	}

	@GetMapping("/accuracy")
	public CustomResponse<DateAccuracyAverageResDto> findDateAverageAccuracy(
		@RequestHeader("Authorization") String jwtToken,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findAccuracyAverageByUser(userService.getUserByJwtToken(jwtToken), startDay, endDay));
	}

}
