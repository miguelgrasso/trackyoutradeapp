import { Injectable } from '@nestjs/common';
import { ILoggerStrategy, LogLevel, ILogEntry } from '../../interfaces/logger.interface';

@Injectable()
export class ConsoleLoggerStrategy implements ILoggerStrategy {
  log(level: LogLevel, message: string, context?: string, trace?: string): void {
    const logEntry: ILogEntry = {
      level,
      message,
      context,
      trace,
      timestamp: new Date(),
    };

    const formattedMessage = this.formatMessage(logEntry);

    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage);
        if (trace) console.error(trace);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
      case LogLevel.VERBOSE:
        console.log(`[VERBOSE] ${formattedMessage}`);
        break;
      default:
        console.log(formattedMessage);
    }
  }

  private formatMessage(entry: ILogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const context = entry.context ? `[${entry.context}]` : '';
    const level = entry.level.toUpperCase().padEnd(7);
    
    return `[${timestamp}] [${level}] ${context} ${entry.message}`;
  }
}