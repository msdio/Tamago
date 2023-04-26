package com.project.Tamago.common.sort;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class LatestSortFactory implements CustomSortFactory {

	@Override
	public Sort getSort() {
		return Sort.by("createdDate").descending().and(Sort.by("updatedDate").descending());
	}

	@Override
	public boolean isAdapted(String value) {
		return value.equals("latest");
	}
}
