export interface ILogger {
  log(message: string, context?: string): void;
  error(message: string, trace?: string, context?: string): void;
  warn(message: string, context?: string): void;
  debug(message: string, context?: string): void;
  verbose(message: string, context?: string): void;
}

export interface ILoggerStrategy {
  log(level: LogLevel, message: string, context?: string, trace?: string): void;
}

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  LOG = 'log',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

export interface ILogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  trace?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}