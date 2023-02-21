class EmailDuplicateError extends Error {
  constructor() {
    super('이미 존재하는 이메일입니다.');
    this.name = 'EmailDuplicateError';
  }
}

class NicknameDuplicateError extends Error {
  constructor() {
    super('이미 존재하는 닉네임입니다.');
    this.name = 'NicknameDuplicateError';
  }
}

class ServerError extends Error {
  constructor() {
    super('서버 에러가 발생했습니다.');
    this.name = 'ServerError';
  }
}

class SignupError extends Error {
  constructor() {
    super('회원가입에 실패했습니다.');
    this.name = 'SignupError';
  }
}

export { EmailDuplicateError, NicknameDuplicateError, ServerError, SignupError };
