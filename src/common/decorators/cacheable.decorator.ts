import { CacheService } from '../caching/cache.service';

export interface CacheableOptions {
  ttl?: number; // Time to live in seconds
  keyGenerator?: (...args: any[]) => string;
  prefix?: string;
}

export function Cacheable(options: CacheableOptions = {}) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheService: CacheService = this.cacheService;
      
      if (!cacheService) {
        // If no cache service is available, just execute the original method
        return await originalMethod.apply(this, args);
      }

      // Generate cache key
      const keyPrefix = options.prefix || `${target.constructor.name}:${propertyName}`;
      const cacheKey = options.keyGenerator 
        ? options.keyGenerator(...args)
        : cacheService.generateKey(keyPrefix, ...args);

      try {
        // Try to get from cache first
        const cachedResult = await cacheService.get(cacheKey);
        if (cachedResult !== null) {
          return cachedResult;
        }

        // If not in cache, execute original method
        const result = await originalMethod.apply(this, args);

        // Cache the result
        await cacheService.set(cacheKey, result, options.ttl);

        return result;
      } catch (error) {
        // If caching fails, still execute the original method
        return await originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}

export function CacheEvict(options: { pattern?: string; key?: string; keyGenerator?: (...args: any[]) => string }) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      
      const cacheService: CacheService = this.cacheService;
      
      if (cacheService) {
        try {
          if (options.pattern) {
            await cacheService.deletePattern(options.pattern);
          } else if (options.key) {
            await cacheService.delete(options.key);
          } else if (options.keyGenerator) {
            const keyToEvict = options.keyGenerator(...args);
            await cacheService.delete(keyToEvict);
          }
        } catch (error) {
          // Log error but don't fail the operation
          console.error('Cache eviction failed:', error);
        }
      }

      return result;
    };

    return descriptor;
  };
}