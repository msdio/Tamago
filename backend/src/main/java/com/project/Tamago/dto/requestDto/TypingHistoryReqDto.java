package com.project.Tamago.dto.requestDto;

import java.time.LocalDateTime;
import java.util.Map;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import com.project.Tamago.exception.CustomException;
import com.project.Tamago.exception.exceptionHandler.ErrorCode;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
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

	@Builder
	public TypingHistoryReqDto(int typingId, String resultContent, LocalDateTime startTime, LocalDateTime endTime,
		int typingSpeed, int typingPage, int wpm, int typingAccuracy, String mode,
		Map<Character, WrongKey> wrongKeys) {
		this.typingId = typingId;
		this.resultContent = resultContent;
		this.startTime = startTime;
		this.endTime = endTime;
		this.typingSpeed = typingSpeed;
		this.typingPage = typingPage;
		this.wpm = wpm;
		this.typingAccuracy = typingAccuracy;
		this.mode = mode;
		this.wrongKeys = wrongKeys;
	}

	@Getter
	@NoArgsConstructor
	private static class WrongKey {
		private int total;

		private int count;

		public void setTotal(int total) {
			if(total < 0 ) {
				throw new CustomException(ErrorCode.INVALID_PARAMETER);
			}
			this.total = total;
		}

		public void setCount(int count) {
			if(count < 0 || count > this.total) {
				throw new CustomException(ErrorCode.INVALID_PARAMETER);
			}
			this.count = count;
		}
	}
}
