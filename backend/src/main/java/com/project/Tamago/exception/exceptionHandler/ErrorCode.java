package com.project.Tamago.exception.exceptionHandler;

public enum ErrorCode {

	INVALID_INPUT_VALUE(400, "유효성 검증에 실패한 경우"),
	INTERNAL_SERVER_ERROR(500, "서버에서 처리할 수 없는 경우"),
	EXPIRED_JWT(2000, "만료된 JWT입니다."),
	INVALID_SIGNATURE(2001, "유효하지 않은 서명입니다"),
	INVALID_JWT(2002, "유효하지 않은 JWT입니다."),
	UNSUPPORTED_JWT(2003, "지원하지않는 JWT입니다."),
	INVALID_USER_JWT(2004, "권한이 없는 유저의 접근입니다.");

	private final int code;
	private final String description;

	ErrorCode(int code, String description) {
		this.code = code;
		this.description = description;
	}

	public int getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}
}