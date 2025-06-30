import { Injectable } from '@nestjs/common';
import { ICacheStrategy } from '../../interfaces/cache.interface';

@Injectable()
export class RedisCacheStrategy implements ICacheStrategy {
  // Note: In a real implementation, you would inject Redis client here
  // For this example, we'll simulate Redis behavior with console logs
  // and fallback to in-memory storage

  private mockRedis = new Map<string, { value: string; expiresAt: number }>();

  async get<T>(key: string): Promise<T | null> {
    try {
      // Simulate Redis GET operation
      console.log(`[REDIS] GET ${key}`);
      
      const item = this.mockRedis.get(key);
      if (!item) {
        return null;
      }

      if (Date.now() > item.expiresAt) {
        await this.delete(key);
        return null;
      }

      return JSON.parse(item.value);
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl = 300): Promise<void> {
    try {
      // Simulate Redis SET operation
      console.log(`[REDIS] SET ${key} EX ${ttl}`);
      
      const serializedValue = JSON.stringify(value);
      const expiresAt = Date.now() + (ttl * 1000);

      this.mockRedis.set(key, {
        value: serializedValue,
        expiresAt,
      });
    } catch (error) {
      console.error('Redis SET error:', error);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      // Simulate Redis DEL operation
      console.log(`[REDIS] DEL ${key}`);
      this.mockRedis.delete(key);
    } catch (error) {
      console.error('Redis DEL error:', error);
      throw error;
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    try {
      // Simulate Redis KEYS + DEL operations
      console.log(`[REDIS] KEYS ${pattern} + DEL`);
      
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      const keysToDelete: string[] = [];

      for (const key of this.mockRedis.keys()) {
        if (regex.test(key)) {
          keysToDelete.push(key);
        }
      }

      for (const key of keysToDelete) {
        await this.delete(key);
      }
    } catch (error) {
      console.error('Redis pattern delete error:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      // Simulate Redis FLUSHDB operation
      console.log(`[REDIS] FLUSHDB`);
      this.mockRedis.clear();
    } catch (error) {
      console.error('Redis clear error:', error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      // Simulate Redis EXISTS operation
      console.log(`[REDIS] EXISTS ${key}`);
      
      const item = this.mockRedis.get(key);
      if (!item) {
        return false;
      }

      if (Date.now() > item.expiresAt) {
        await this.delete(key);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return false;
    }
  }
}