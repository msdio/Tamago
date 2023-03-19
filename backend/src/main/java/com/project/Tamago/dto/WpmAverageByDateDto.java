package com.project.Tamago.dto;

import java.time.LocalDate;

public interface AccuracyAverageByDateDto {

	LocalDate getCreatedDate();
	double getAccuracyAverage();
	double getWpmAverage();
}
