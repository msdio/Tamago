package com.project.tamago.dto.responseDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.project.tamago.dto.AccuracyAverageByDateDto;

import lombok.Data;

@Data
public class DateAccuracyAverageResDto {
	private Map<LocalDate, Double> accuracyDataMap;

	public DateAccuracyAverageResDto(List<AccuracyAverageByDateDto> accuracyAverageByDateDtos) {
		this.accuracyDataMap = accuracyAverageByDateDtos.stream()
			.collect(Collectors.toMap(
				AccuracyAverageByDateDto::getCreatedDate, AccuracyAverageByDateDto::getAccuracyAverage
			));
	}
}
