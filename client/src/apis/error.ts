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

export class ErrorResponse extends Error {
  constructor() {
    super();
    this.code = 500;
    this.description = '서버가 응답하지 않습니다.';
  }

  code: number;
  description: string;
}

export { EmailDuplicateError, NicknameDuplicateError, ServerError, SignupError };
