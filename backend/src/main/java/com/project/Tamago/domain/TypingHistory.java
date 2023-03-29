package com.project.Tamago.domain;

import java.time.LocalDateTime;
import java.util.Map;

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
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.project.Tamago.common.enums.Mode;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@TypeDef(name = "json", typeClass = JsonType.class)
public class TypingHistory extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "typing_id", nullable = true, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private Typing typing;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "longTyping_id", nullable = true, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private LongTyping longTyping;

	private Integer wpm;

	private Double typingAccuracy;

	@ColumnDefault("true")
	private Boolean contentType;


	@Enumerated(EnumType.STRING)
	private Mode mode;

	private LocalDateTime startTime;

	private LocalDateTime endTime;

	private Integer beforeMmr;

	private Integer increasedValue;
	private Integer page;

	@Type(type = "json")
	@Column(columnDefinition = "json")
	private Map<Character, Map<String, Integer>> wrongKeys;
}
