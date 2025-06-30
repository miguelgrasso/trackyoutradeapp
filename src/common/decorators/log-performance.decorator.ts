import { CustomLoggerService } from '../logging/custom-logger.service';

export function LogPerformance(context?: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      const logger = this.logger || this.customLogger;
      
      try {
        const result = await method.apply(this, args);
        const duration = Date.now() - start;
        
        if (logger && typeof logger.logPerformance === 'function') {
          logger.logPerformance(
            `${target.constructor.name}.${propertyName}`,
            duration,
            context || target.constructor.name
          );
        }
        
        return result;
      } catch (error) {
        const duration = Date.now() - start;
        
        if (logger && typeof logger.logPerformance === 'function') {
          logger.logPerformance(
            `${target.constructor.name}.${propertyName} (ERROR)`,
            duration,
            context || target.constructor.name
          );
        }
        
        throw error;
      }
    };

    return descriptor;
  };
}