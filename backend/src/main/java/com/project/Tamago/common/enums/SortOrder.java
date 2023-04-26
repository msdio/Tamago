package com.project.Tamago.common.enums;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.project.Tamago.common.exception.CustomException;
import com.project.Tamago.common.sort.CustomSortFactory;

@Component
public class SortOrder {

	@Autowired
	private static List<CustomSortFactory> customSorts;

	public static Sort getSort(String sortBy) {
		return customSorts.stream()
			.filter(customSort -> customSort.isAdapted(sortBy))
			.findAny()
			.orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND_SORT))
			.getSort();
	}
}
