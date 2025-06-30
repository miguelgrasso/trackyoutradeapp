import { Injectable } from '@nestjs/common';
import { ILoggerStrategy, LogLevel, ILogEntry } from '../../interfaces/logger.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerStrategy implements ILoggerStrategy {
  private readonly logDir = 'logs';
  private readonly maxFileSize = 10 * 1024 * 1024; // 10MB

  constructor() {
    this.ensureLogDirectory();
  }

  log(level: LogLevel, message: string, context?: string, trace?: string): void {
    const logEntry: ILogEntry = {
      level,
      message,
      context,
      trace,
      timestamp: new Date(),
    };

    const formattedMessage = this.formatMessage(logEntry);
    const filename = this.getLogFilename(level);
    
    this.writeToFile(filename, formattedMessage);
    
    if (trace && level === LogLevel.ERROR) {
      this.writeToFile(filename, `Stack Trace: ${trace}`);
    }
  }

  private formatMessage(entry: ILogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const context = entry.context ? ` [${entry.context}]` : '';
    const level = entry.level.toUpperCase().padEnd(7);
    
    return `[${timestamp}] [${level}]${context} ${entry.message}`;
  }

  private getLogFilename(level: LogLevel): string {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${level}-${date}.log`);
  }

  private writeToFile(filename: string, message: string): void {
    try {
      // Check file size and rotate if needed
      if (fs.existsSync(filename)) {
        const stats = fs.statSync(filename);
        if (stats.size > this.maxFileSize) {
          this.rotateLogFile(filename);
        }
      }

      fs.appendFileSync(filename, message + '\n', 'utf8');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private rotateLogFile(filename: string): void {
    const timestamp = new Date().getTime();
    const rotatedFilename = filename.replace('.log', `.${timestamp}.log`);
    
    try {
      fs.renameSync(filename, rotatedFilename);
    } catch (error) {
      console.error('Failed to rotate log file:', error);
    }
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }
}