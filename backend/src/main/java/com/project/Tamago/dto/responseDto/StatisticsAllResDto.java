package com.project.Tamago.dto.responseDto;

import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatisticsAllResDto {

	private Double accuracyAverage;
	private Double wpmAverage;
	private Map<Character, Double> characterErrorMap;
}
