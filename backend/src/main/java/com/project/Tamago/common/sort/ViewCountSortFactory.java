package com.project.Tamago.common.sort;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class ViewCountSortFactory implements CustomSortFactory {

	@Override
	public Sort getSort() {
		return Sort.by("viewCount").descending().and(Sort.by("updatedDate").descending());
	}

	@Override
	public boolean isAdapted(String value) {
		return value.equals("latest");
	}
}
