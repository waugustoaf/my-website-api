export class AppError {
  public readonly status: number;

  public readonly message: string;

  constructor(message: string, status = 400) {
    this.status = status;
    this.message = message;
  }
}
