package com.project.tamago.dto.requestDto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import com.project.tamago.dto.WrongKey;

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

	public Map<Character, Map<String, Integer>> wrongKeysChangeType() {
		Map<Character, Map<String, Integer>> collect = wrongKeys.entrySet().stream()
			.collect(Collectors.toMap(
				Map.Entry::getKey,
				entry -> {
					HashMap<String, Integer> map = new HashMap<>();
					int count = entry.getValue().getCount();
					int total = entry.getValue().getTotal();
					map.put("count", count);
					map.put("total", total);
					return map;
				}));
		return collect;
	}
}
