interface ErrorType {
  code: number | string;
  description: string;
}

export class ApiError implements ErrorType {
  code: string | number = '000';
  description = 'unknown error';

  constructor(error?: any) {
    if (error) this.make(error);
  }

  make(error: any) {
    if (error.code) this.code = error.code;
    if (error.description) this.description = error.description;

    return this;
  }

  get(): ErrorType {
    return {
      code: this.code,
      description: this.description,
    };
  }

  setCode(code: ErrorType['code']): ApiError {
    this.code = code;
    return this;
  }

  setDescription(description: ErrorType['description']): ApiError {
    this.description = description;
    return this;
  }
}
