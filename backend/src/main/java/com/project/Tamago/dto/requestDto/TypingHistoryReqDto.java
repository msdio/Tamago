package com.project.Tamago.dto.requestDto;

import java.time.LocalDateTime;
import java.util.Map;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import com.project.Tamago.dto.WrongKey;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypingHistoryReqDto {

	@NotNull
	private int typingId;
	@NotNull
	private String resultContent;
	@NotNull
	private LocalDateTime startTime;
	@NotNull
	private LocalDateTime endTime;
	@NotNull
	@Range(min = 0, max = 2000)
	private int typingSpeed;

	private int typingPage;

	private int wpm;

	@NotNull
	@Range(min = 0, max = 100)
	private int typingAccuracy;
	@NotNull
	private String mode;

	@NotNull
	private Map<Character, WrongKey> wrongKeys;

}
