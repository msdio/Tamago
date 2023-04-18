const RESPONSE_CODE = {
  SERVER_ERROR: 500,

  SUCCESS: 1000,

  EXPIRED_JWT: 2000,
  INVALID_SIGNITURE: 2001,
  INVALID_JWT: 2002,
  UNSUPPORTED_JWT: 2003,
  INVALID_USER_JWT: 2004,
  EMPTY_JWT: 2005,
  DIFFERENT_REFRESH_TOKEN: 2006,

  EMPTY_USER_EMAIL: 3000,
  EMAIL_DUPLICATE: 3001,
  NICKNAME_DUPLICATE: 3002,
  USER_NOT_EXIST: 3003,
};

Object.freeze(RESPONSE_CODE);

export { RESPONSE_CODE };
