package com.project.tamago.common.enums;

import org.springframework.data.domain.Sort;

import lombok.Getter;

@Getter
public enum SortOrder {
	LATEST("latest"),
	OLDEST("oldest"),
	VIEW_COUNT("viewCount");

	private final String desc;

	SortOrder(String desc) {
		this.desc = desc;
	}

	public static Sort getSort(String sortBy) {
		if (LATEST.desc.equals(sortBy)) {
			return Sort.by("createdDate").descending().and(Sort.by("updatedDate").descending());
		}
		if (OLDEST.desc.equals(sortBy)) {
			return Sort.by("createdDate").ascending().and(Sort.by("updatedDate").ascending());
		}
		if (VIEW_COUNT.desc.equals(sortBy)) {
			return Sort.by("viewCount").descending().and(Sort.by("updatedDate").descending());
		}
		throw new IllegalArgumentException("Invalid sortBy parameter: " + sortBy);
	}
}
