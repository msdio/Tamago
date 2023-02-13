/**
 * 이메일 확인 정규식
 */
const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

/**
 * 비밀번호 확인 정규식
 */
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,12}$/;

export { EMAIL_REGEX, PASSWORD_REGEX };
