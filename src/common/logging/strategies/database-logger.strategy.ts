import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma.service';
import { ILoggerStrategy, LogLevel, ILogEntry } from '../../interfaces/logger.interface';

@Injectable()
export class DatabaseLoggerStrategy implements ILoggerStrategy {
  constructor(private readonly prisma: PrismaService) {}

  log(level: LogLevel, message: string, context?: string, trace?: string): void {
    // Only log ERROR and WARN levels to database to avoid performance impact
    if (level === LogLevel.ERROR || level === LogLevel.WARN) {
      this.logToDatabase(level, message, context, trace);
    }
  }

  private async logToDatabase(
    level: LogLevel, 
    message: string, 
    context?: string, 
    trace?: string
  ): Promise<void> {
    try {
      // Note: You would need to create a Log table in your Prisma schema
      // This is just an example of how it would work
      console.log(`[DATABASE LOG] ${level.toUpperCase()}: ${message}`);
      
      // Example implementation if you had a Log model:
      // await this.prisma.log.create({
      //   data: {
      //     level,
      //     message,
      //     context,
      //     trace,
      //     timestamp: new Date(),
      //   },
      // });
    } catch (error) {
      // Fallback to console if database logging fails
      console.error('Failed to log to database:', error);
      console.error(`Original log: [${level.toUpperCase()}] ${message}`);
    }
  }
}