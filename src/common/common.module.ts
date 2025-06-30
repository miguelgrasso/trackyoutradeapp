import { Global, Module } from '@nestjs/common';
import { ValidationService } from './services/validation.service';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { CustomLoggerService } from './logging/custom-logger.service';
import { ConsoleLoggerStrategy } from './logging/strategies/console-logger.strategy';
import { FileLoggerStrategy } from './logging/strategies/file-logger.strategy';
import { DatabaseLoggerStrategy } from './logging/strategies/database-logger.strategy';
import { ILoggerStrategy } from './interfaces/logger.interface';
import { ICacheStrategy } from './interfaces/cache.interface';
import { CacheService } from './caching/cache.service';
import { MemoryCacheStrategy } from './caching/strategies/memory-cache.strategy';
import { RedisCacheStrategy } from './caching/strategies/redis-cache.strategy';
import { PrismaService } from '../config/prisma.service';

@Global()
@Module({
  providers: [
    ValidationService,
    AllExceptionsFilter,
    CustomLoggerService,
    CacheService,
    PrismaService,
    ConsoleLoggerStrategy,
    FileLoggerStrategy,
    DatabaseLoggerStrategy,
    MemoryCacheStrategy,
    RedisCacheStrategy,
    {
      provide: 'LOGGER_STRATEGIES',
      useFactory: (
        consoleLogger: ConsoleLoggerStrategy,
        fileLogger: FileLoggerStrategy,
        databaseLogger: DatabaseLoggerStrategy,
      ): ILoggerStrategy[] => {
        const strategies = [consoleLogger, fileLogger];
        
        // Add database logger only in production or when explicitly enabled
        if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DB_LOGGING === 'true') {
          strategies.push(databaseLogger as any);
        }
        
        return strategies;
      },
      inject: [ConsoleLoggerStrategy, FileLoggerStrategy, DatabaseLoggerStrategy],
    },
    {
      provide: 'CACHE_STRATEGY',
      useFactory: (
        memoryCache: MemoryCacheStrategy,
        redisCache: RedisCacheStrategy,
      ) => {
        // Use Redis in production, Memory in development
        return process.env.NODE_ENV === 'production' && process.env.REDIS_URL 
          ? redisCache 
          : memoryCache;
      },
      inject: [MemoryCacheStrategy, RedisCacheStrategy],
    },
  ],
  exports: [
    ValidationService,
    AllExceptionsFilter,
    CustomLoggerService,
    CacheService,
  ],
})
export class CommonModule {}