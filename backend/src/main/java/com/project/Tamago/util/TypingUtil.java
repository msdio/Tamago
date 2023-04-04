package com.project.Tamago.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.project.Tamago.domain.Typing;
import com.project.Tamago.dto.PageContentDto;
import com.project.Tamago.dto.ShortTypingDto;
import com.project.Tamago.dto.mapper.TypingMapper;

public class TypingUtil {

	private static final int LINES_PER_PAGE = 20;

	public static PageContentDto getPageContent(String content, Integer page) {
		String[] contentLines = content.split("\r\n");
		int startIndex = (page - 1) * LINES_PER_PAGE;
		int endIndex = Math.min(startIndex + LINES_PER_PAGE, contentLines.length);
		String pageContent = String.join("\n", Arrays.copyOfRange(contentLines, startIndex, endIndex));
		return new PageContentDto(page, pageContent);
	}

	public static PageContentDto getPageContent(String content) {
		int totalPages = (int) Math.ceil((double) content.split("\r\n").length / LINES_PER_PAGE);
		int randomPage = (int) (Math.random() * totalPages) + 1;
		return getPageContent(content, randomPage);
	}

	public static List<ShortTypingDto> getRandomShortTypings(List<Typing> shortTypingsAllList, int limit) {
		Collections.shuffle(shortTypingsAllList);
		return shortTypingsAllList.stream()
			.limit(limit)
			.map(TypingMapper::toShortTypingDto)
			.collect(Collectors.toList());
	}
}
