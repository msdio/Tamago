/**
 * 이메일 확인 정규식
 */
const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

/**
 * 비밀번호 확인 정규식
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#~^*])[A-Za-z\\d!@#~^*]{8,}$/;

export { EMAIL_REGEX, PASSWORD_REGEX };
