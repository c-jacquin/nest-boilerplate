import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(err) {
    super(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
