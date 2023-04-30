package com.project.tamago.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.tamago.common.annotation.Login;
import com.project.tamago.common.response.CustomResponse;
import com.project.tamago.dto.LoginResolverDto;
import com.project.tamago.dto.responseDto.DateAccuracyAverageResDto;
import com.project.tamago.dto.responseDto.DateWpmAverageResDto;
import com.project.tamago.dto.responseDto.StatisticsAllResDto;
import com.project.tamago.service.StatisticService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticController {

	private final StatisticService statisticService;

	@GetMapping("/all")
	public CustomResponse<StatisticsAllResDto> findUserStatistic(@Login LoginResolverDto loginResolverDto) {
		return new CustomResponse<>(statisticService.totalStatisticsAll(loginResolverDto.getUserId()));
	}

	@GetMapping("/speed")
	public CustomResponse<DateWpmAverageResDto> findDateAverageWpm(@Login LoginResolverDto loginResolverDto,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findWpmAverageByUser(loginResolverDto.getUserId(), startDay, endDay));
	}

	@GetMapping("/accuracy")
	public CustomResponse<DateAccuracyAverageResDto> findDateAverageAccuracy(@Login LoginResolverDto loginResolverDto,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findAccuracyAverageByUser(loginResolverDto.getUserId(), startDay, endDay));
	}

}
