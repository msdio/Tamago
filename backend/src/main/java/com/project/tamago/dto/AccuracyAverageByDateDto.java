package com.project.tamago.dto;

import java.time.LocalDate;

public interface AccuracyAverageByDateDto {

	LocalDate getCreatedDate();
	double getAccuracyAverage();
}
