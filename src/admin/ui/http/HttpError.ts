export class HttpError extends Error {
  constructor(public message: string, public status: number, public body: any) {
    super(message);
    this.message = message;
    this.status = status;
    this.body = body;
    this.name = this.constructor.name;
    this.stack = new Error(message).stack;
  }
}

export default HttpError;
