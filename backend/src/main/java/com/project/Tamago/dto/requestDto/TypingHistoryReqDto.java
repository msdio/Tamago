package com.project.Tamago.dto.requestDto;

import java.time.LocalDateTime;
import java.util.Map;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import com.project.Tamago.exception.CustomException;
import com.project.Tamago.exception.exceptionHandler.ErrorCode;

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
	private Integer typingId;
	@NotNull
	private String resultContent;
	@NotNull
	private LocalDateTime startTime;
	@NotNull
	private LocalDateTime endTime;
	@NotNull
	@Range(min = 0, max = 2000)
	private Integer typingSpeed;

	private Integer wpm;

	@NotNull
	@Range(min = 0, max = 100)
	private Integer typingAccuracy;
	@NotNull
	private String mode;

	private Integer page;

	@NotNull
	private Boolean contentType;

	@NotNull
	private Map<Character, WrongKey> wrongKeys;

	@Getter
	@NoArgsConstructor
	private static class WrongKey {
		private int total;

		private int count;

		public void setTotal(int total) {
			if (total < 0) {
				throw new CustomException(ErrorCode.INVALID_PARAMETER);
			}
			this.total = total;
		}

		public void setCount(int count) {
			if (count < 0 || count > this.total) {
				throw new CustomException(ErrorCode.INVALID_PARAMETER);
			}
			this.count = count;
		}
	}
}
