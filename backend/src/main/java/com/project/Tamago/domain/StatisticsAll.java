package com.project.Tamago.domain;

import java.util.Map;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@TypeDef(name = "json", typeClass = JsonType.class)
@Getter
public class StatisticsAll extends BaseTimeEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private double accuracyAverage;
	private double wpmAverage;
	private int length;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private User user;

	@Type(type = "json")
	@Column(columnDefinition = "json")
	private Map<Character, Map<String, Integer>> wrongKeyInfo;

	public void changeStatisticsAll(double accuracyAverage, double wpmAverage, int length) {
		changeAccuracyAverage(accuracyAverage, length);
		changeWpmAverage(accuracyAverage, length);
		addLength(length);
	}

	private void addLength(int length) {
		this.length += length;
	}

	private void changeAccuracyAverage(double accuracyAverage, int length) {
		double now = this.length * this.accuracyAverage;
		double change = accuracyAverage * length;
		this.accuracyAverage = (now + change) / (length + this.length);
	}

	private void changeWpmAverage(double wpmAverage, int length) {
		double now = this.length * this.wpmAverage;
		double change = wpmAverage * length;
		this.wpmAverage = (now + change) / (length + this.length);
	}

}
