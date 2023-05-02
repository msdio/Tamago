package com.project.Tamago.common.sort;

import org.springframework.data.domain.Sort;

public interface CustomSortFactory {

	public Sort getSort();
	public boolean isAdapted(String value);
}
