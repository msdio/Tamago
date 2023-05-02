package com.project.Tamago.common.sort;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class OldestSortFactory implements CustomSortFactory {

	@Override
	public Sort getSort() {
		return Sort.by("createdDate").ascending().and(Sort.by("updatedDate").ascending());
	}

	@Override
	public boolean isAdapted(String value) {
		return value.equals("oldest");
	}
}
