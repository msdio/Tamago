package com.project.Tamago.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.project.Tamago.common.enums.Language;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;


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
@DynamicInsert
public class LongTyping extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String title;
	@Column(length = 2000)
	private String content;
	private String thumbnail;
	@Enumerated(EnumType.STRING)
	private Language language;
	private Integer length;
	private Integer totalPage;
	private Integer viewCount;
	@ColumnDefault("false")
	private Boolean isRegistered;
}
