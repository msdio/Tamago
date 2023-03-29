package com.project.Tamago.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.Response.CustomResponse;
import com.project.Tamago.dto.Login;
import com.project.Tamago.dto.responseDto.DateAccuracyAverageResDto;
import com.project.Tamago.dto.responseDto.DateWpmAverageResDto;
import com.project.Tamago.dto.responseDto.StatisticsAllResDto;
import com.project.Tamago.service.StatisticService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticController {

	private final StatisticService statisticService;

	@GetMapping("/all")
	public CustomResponse<StatisticsAllResDto> findUserStatistic(@com.project.Tamago.common.annotation.Login Login login) {
		return new CustomResponse<>(statisticService.totalStatisticsAll(login.getUserId()));
	}

	@GetMapping("/speed")
	public CustomResponse<DateWpmAverageResDto> findDateAverageWpm(
		@com.project.Tamago.common.annotation.Login Login login,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findWpmAverageByUser(login.getUserId(), startDay, endDay));
	}

	@GetMapping("/accuracy")
	public CustomResponse<DateAccuracyAverageResDto> findDateAverageAccuracy(
		@com.project.Tamago.common.annotation.Login Login login,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findAccuracyAverageByUser(login.getUserId(), startDay, endDay));
	}

}
