package com.project.Tamago.dto;

import com.project.Tamago.exception.CustomException;
import com.project.Tamago.exception.exceptionHandler.ErrorCode;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class WrongKey {
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