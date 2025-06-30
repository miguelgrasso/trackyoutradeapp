import { Injectable, Inject } from '@nestjs/common';
import { ILogger, ILoggerStrategy, LogLevel } from '../interfaces/logger.interface';

@Injectable()
export class CustomLoggerService implements ILogger {
  constructor(
    @Inject('LOGGER_STRATEGIES')
    private readonly loggerStrategies: ILoggerStrategy[]
  ) {}

  log(message: string, context?: string): void {
    this.writeLog(LogLevel.LOG, message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.writeLog(LogLevel.ERROR, message, context, trace);
  }

  warn(message: string, context?: string): void {
    this.writeLog(LogLevel.WARN, message, context);
  }

  debug(message: string, context?: string): void {
    this.writeLog(LogLevel.DEBUG, message, context);
  }

  verbose(message: string, context?: string): void {
    this.writeLog(LogLevel.VERBOSE, message, context);
  }

  // Enhanced methods for trading operations
  logTradeCreated(tradeId: number, symbol: string, quantity: number, context?: string): void {
    const message = `Trade created: ID=${tradeId}, Symbol=${symbol}, Quantity=${quantity}`;
    this.log(message, context || 'TradeService');
  }

  logValidationError(validationErrors: string[], context?: string): void {
    const message = `Validation failed: ${validationErrors.join(', ')}`;
    this.error(message, undefined, context || 'ValidationService');
  }

  logRepositoryOperation(operation: string, entity: string, id?: number, context?: string): void {
    const message = `Repository ${operation}: ${entity}${id ? ` (ID: ${id})` : ''}`;
    this.debug(message, context || 'Repository');
  }

  logPerformance(operation: string, duration: number, context?: string): void {
    const message = `Performance: ${operation} took ${duration}ms`;
    if (duration > 1000) {
      this.warn(message, context || 'Performance');
    } else {
      this.debug(message, context || 'Performance');
    }
  }

  private writeLog(level: LogLevel, message: string, context?: string, trace?: string): void {
    this.loggerStrategies.forEach(strategy => {
      try {
        strategy.log(level, message, context, trace);
      } catch (error) {
        // Fallback to console if strategy fails
        console.error(`Logger strategy failed:`, error);
        console.log(`Original message: [${level.toUpperCase()}] ${message}`);
      }
    });
  }
}