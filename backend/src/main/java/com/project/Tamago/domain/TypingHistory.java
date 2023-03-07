package com.project.Tamago.domain;

import java.time.LocalDateTime;

import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.project.Tamago.constants.enums.Mode;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TypingHistory extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "typing_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private Typing typing;

	private Integer wpm;

	private Double accuracy;

	@ColumnDefault("true")
	private Boolean contentType;

	@Enumerated(EnumType.STRING)
	private Mode mode;

	private LocalDateTime startTime;
	private LocalDateTime endTime;

	private Integer beforeMmr;

	private Integer increasedValue;

}
