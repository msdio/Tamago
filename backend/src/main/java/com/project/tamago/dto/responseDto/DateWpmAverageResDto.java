package com.project.tamago.dto.responseDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.project.tamago.dto.WpmAverageByDateDto;

import lombok.Data;

@Data
public class DateWpmAverageResDto {

	private Map<LocalDate, Double> accuracyDataMap;

	public DateWpmAverageResDto(List<WpmAverageByDateDto> accuracyAverageByDateDtos) {
		this.accuracyDataMap = accuracyAverageByDateDtos.stream()
			.collect(Collectors.toMap(
				WpmAverageByDateDto::getCreatedDate, WpmAverageByDateDto::getWpmAverage
			));
	}
}
