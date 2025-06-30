import { Injectable } from '@nestjs/common';
import { ICacheStrategy } from '../../interfaces/cache.interface';

interface CacheItem<T> {
  value: T;
  expiresAt: number;
  size: number;
}

@Injectable()
export class MemoryCacheStrategy implements ICacheStrategy {
  private cache = new Map<string, CacheItem<any>>();
  private readonly maxMemorySize: number;
  private currentMemoryUsage = 0;

  constructor() {
    this.maxMemorySize = 100 * 1024 * 1024; // 100MB default in bytes
  }

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiresAt) {
      await this.delete(key);
      return null;
    }

    return item.value;
  }

  async set<T>(key: string, value: T, ttl = 300): Promise<void> {
    const expiresAt = Date.now() + (ttl * 1000);
    const serializedValue = JSON.stringify(value);
    const size = Buffer.byteLength(serializedValue, 'utf8');

    // Check if adding this item would exceed memory limit
    if (this.currentMemoryUsage + size > this.maxMemorySize) {
      await this.evictLRU();
    }

    // Remove existing item if it exists
    if (this.cache.has(key)) {
      const existingItem = this.cache.get(key)!;
      this.currentMemoryUsage -= existingItem.size;
    }

    const item: CacheItem<T> = {
      value,
      expiresAt,
      size,
    };

    this.cache.set(key, item);
    this.currentMemoryUsage += size;
  }

  async delete(key: string): Promise<void> {
    const item = this.cache.get(key);
    if (item) {
      this.currentMemoryUsage -= item.size;
      this.cache.delete(key);
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      await this.delete(key);
    }
  }

  async clear(): Promise<void> {
    this.cache.clear();
    this.currentMemoryUsage = 0;
  }

  async exists(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    if (!item) {
      return false;
    }

    if (Date.now() > item.expiresAt) {
      await this.delete(key);
      return false;
    }

    return true;
  }

  private async evictLRU(): Promise<void> {
    // Simple LRU eviction - remove 25% of oldest items
    const entries = Array.from(this.cache.entries());
    const itemsToRemove = Math.ceil(entries.length * 0.25);

    for (let i = 0; i < itemsToRemove && entries.length > 0; i++) {
      const [key] = entries[i];
      await this.delete(key);
    }
  }

  // Utility methods for monitoring
  getStats() {
    return {
      itemCount: this.cache.size,
      memoryUsage: this.currentMemoryUsage,
      memoryUsagePercent: (this.currentMemoryUsage / this.maxMemorySize) * 100,
    };
  }
}