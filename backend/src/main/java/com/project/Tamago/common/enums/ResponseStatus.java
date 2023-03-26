package com.project.Tamago.common.enums;

public enum ResponseStatus {
	SUCCESS(1000, "응답 성공"),

	INVALID_INPUT_VALUE(400, "유효성 검증에 실패한 경우"),
	INTERNAL_SERVER_ERROR(500, "서버 에러입니다"),
	INVALID_PARAMETER(600, "유효하지 않은 파라미터입니다"),

	NULL_PARAMETER(601, "파라미터가 존재하지 않습니다"),
	EXPIRED_JWT(2000, "만료된 JWT입니다."),
	INVALID_SIGNATURE(2001, "유효하지 않은 서명입니다"),
	INVALID_JWT(2002, "유효하지 않은 JWT입니다."),
	UNSUPPORTED_JWT(2003, "지원하지않는 JWT입니다."),
	INVALID_USER_JWT(2004, "권한이 없는 유저의 접근입니다."),
	EMPTY_JWT(2005, "JWT를 입력해주세요."),
	DIFFERENT_REFRESH_TOKEN(2006, "유저 정보와 일치하지 않는 refresh token입니다."),
	NOT_POSSIBLE_REISSUE(2007, "토큰 재발급이 불가합니다."),
	USERS_EMPTY_USER_EMAIL(3000, "유저 이메일 값을 확인해주세요."),
	USERS_EXISTS_EMAIL(3001, "중복된 이메일입니다."),
	USERS_EXISTS_NICKNAME(3002, "중복된 닉네임입니다."),
	USERS_INFO_NOT_EXISTS(3003, "유저 정보가 존재하지 않습니다."),
	TYPING_INFO_NOT_EXISTS(3004, "존재하지 않는 글입니다."),
	USERS_EXISTS_PASSWORD(3005, "유저 비밀번호 값을 확인해주세요."),
	LONG_TYPING_INFO_NOT_EXISTS(4001, "해당 긴 글이 존재하지 않습니다."),
	CURRENT_PAGE_NOT_EXISTS(4002, "연습한 페이지가 없습니다"),
	;

	private final int code;
	private final String description;

	ResponseStatus(int code, String description) {
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
