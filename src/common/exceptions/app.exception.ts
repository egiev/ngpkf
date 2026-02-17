export class AppException extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public errors?: { field: string; message: string }[],
  ) {
    super(message);
  }
}

export class BadRequestAppException extends AppException {
  constructor(message = 'Bad request', errors?: { field: string; message: string }[]) {
    super(message, 400, errors);
  }
}

export class NotFoundAppException extends AppException {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictAppException extends AppException {
  constructor(message = 'Conflict detected') {
    super(message, 409);
  }
}

export class UnauthorizedAppException extends AppException {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}
