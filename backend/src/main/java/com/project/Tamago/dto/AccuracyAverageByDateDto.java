package com.project.Tamago.dto;

import java.time.LocalDate;

public interface AverageStatisticsByDateDto {

	LocalDate getCreatedDate();
	double getAccuracyAverage();
	double getWpmAverage();
}
