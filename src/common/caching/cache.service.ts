import { Injectable, Inject } from '@nestjs/common';
import { ICacheService, ICacheStrategy } from '../interfaces/cache.interface';
import { CustomLoggerService } from '../logging/custom-logger.service';

@Injectable()
export class CacheService implements ICacheService {
  constructor(
    @Inject('CACHE_STRATEGY')
    private readonly cacheStrategy: ICacheStrategy,
    private readonly logger: CustomLoggerService
  ) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const result = await this.cacheStrategy.get<T>(key);
      
      if (result) {
        this.logger.debug(`Cache HIT for key: ${key}`, 'CacheService');
      } else {
        this.logger.debug(`Cache MISS for key: ${key}`, 'CacheService');
      }
      
      return result;
    } catch (error) {
      this.logger.error(`Cache GET error for key ${key}: ${error.message}`, error.stack, 'CacheService');
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      await this.cacheStrategy.set(key, value, ttl);
      this.logger.debug(`Cache SET for key: ${key}, TTL: ${ttl || 'default'}`, 'CacheService');
    } catch (error) {
      this.logger.error(`Cache SET error for key ${key}: ${error.message}`, error.stack, 'CacheService');
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.cacheStrategy.delete(key);
      this.logger.debug(`Cache DELETE for key: ${key}`, 'CacheService');
    } catch (error) {
      this.logger.error(`Cache DELETE error for key ${key}: ${error.message}`, error.stack, 'CacheService');
      throw error;
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    try {
      await this.cacheStrategy.deletePattern(pattern);
      this.logger.debug(`Cache DELETE PATTERN: ${pattern}`, 'CacheService');
    } catch (error) {
      this.logger.error(`Cache DELETE PATTERN error for pattern ${pattern}: ${error.message}`, error.stack, 'CacheService');
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.cacheStrategy.clear();
      this.logger.warn('Cache CLEARED', 'CacheService');
    } catch (error) {
      this.logger.error(`Cache CLEAR error: ${error.message}`, error.stack, 'CacheService');
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const exists = await this.cacheStrategy.exists(key);
      this.logger.debug(`Cache EXISTS for key ${key}: ${exists}`, 'CacheService');
      return exists;
    } catch (error) {
      this.logger.error(`Cache EXISTS error for key ${key}: ${error.message}`, error.stack, 'CacheService');
      return false;
    }
  }

  // Utility method to generate cache keys
  generateKey(prefix: string, ...parts: (string | number)[]): string {
    return `${prefix}:${parts.join(':')}`;
  }
}