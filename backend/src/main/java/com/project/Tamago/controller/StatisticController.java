package com.project.Tamago.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Tamago.common.Response.CustomResponse;
import com.project.Tamago.common.annotation.UserId;
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

	@GetMapping("/all")
	public CustomResponse<StatisticsAllResDto> findUserStatistic(@UserId Integer userId) {
		return new CustomResponse<>(statisticService.totalStatisticsAll(userId));
	}

	@GetMapping("/speed")
	public CustomResponse<DateWpmAverageResDto> findDateAverageWpm(
		@UserId Integer userId,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findWpmAverageByUser(userId, startDay, endDay));
	}

	@GetMapping("/accuracy")
	public CustomResponse<DateAccuracyAverageResDto> findDateAverageAccuracy(
		@UserId Integer userId,
		@RequestParam("startDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDay,
		@RequestParam("endDay") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDay) {
		return new CustomResponse<>(
			statisticService.findAccuracyAverageByUser(userId, startDay, endDay));
	}

}
