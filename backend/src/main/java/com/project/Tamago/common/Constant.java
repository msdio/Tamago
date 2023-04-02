package com.project.Tamago.common;

public class Constant {
	public static final String PROVIDER_NONE = "none";
	public static final String AUTHORITIES_KEY = "auth";
	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String REFRESH_TOKEN = "refreshToken";
	public static final String POSSIBLE_REISSUE = "possible reissue";
	public static final String COLON = ":";
	public static final String EXTRACTION_ERROR_MESSAGE = "메세지를 추출하는데 오류가 생겼습니다.\nmessagee : %s";
	public static final String EXCEPTION_MESSAGE_FORMAT = "_%s_ %s.%s:%d - %s";
	public static final String SLACK_MESSAGE_FORMAT = "*%s*\n*[요청한 멤버 id]* %s\n\n*[요청한 ip]* %s\n\n*[ERROR LOG]*\n%s\n\n*[REQUEST_INFORMATION]*\n%s %s\n%s";
	public static final String EMPTY_BODY_MESSAGE = "{BODY IS EMPTY}";
	public static final String SLACK_ALARM_FORMAT = "[SlackAlarm] %s";
}
