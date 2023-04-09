package com.project.Tamago.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
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
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.parameters.P;

import com.project.Tamago.common.enums.Language;
import com.project.Tamago.common.enums.Level;
import com.project.Tamago.common.enums.Mode;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Tier extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private User user;

	@Enumerated(EnumType.STRING)
	private Language language;

	@ColumnDefault("1")
	private Integer level;

	@ColumnDefault("0")
	private Integer mmr;

	@ColumnDefault("0")
	private Integer beforeMmr;

	@ColumnDefault("false")
	private Boolean status;

	public void applyPenalty(int penalty, boolean isDirectPenalty) {
		this.beforeMmr = this.mmr;
		this.mmr = Math.max(0, this.mmr - penalty);
		updateLevel();
		if (isDirectPenalty) {
			this.status = true;
		}
	}
	public void initStatus() {
		this.status = false;
	}

	public void updateLevel() {
		int newLevel = Level.of(this.mmr).getLevel();
		if (this.level != newLevel) {
			this.level = newLevel;
		}
	}
}
