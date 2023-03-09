package com.project.Tamago.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class StatisticsAll {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;


}
