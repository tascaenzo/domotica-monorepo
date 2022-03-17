export interface LogInterface {
  message: string;
  context: string;
  stack?: unknown;
  save?: boolean;
}
