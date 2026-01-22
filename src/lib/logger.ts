/**
 * Centralized logging utility
 * 
 * In development: logs to console
 * In production: can be configured to send to logging service (Sentry, LogRocket, etc.)
 * 
 * Usage:
 *   import logger from '@/lib/logger';
 *   logger.info('User logged in');
 *   logger.error('Failed to fetch data', error);
 *   logger.warn('Deprecated API used');
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
  url?: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private isProduction = import.meta.env.PROD;

  private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry = this.formatMessage(level, message, data);

    // Always log in development
    if (this.isDevelopment) {
      const consoleMethod = level === 'error' ? console.error 
                          : level === 'warn' ? console.warn
                          : level === 'debug' ? console.debug
                          : console.log;
      
      if (data) {
        consoleMethod(`[${level.toUpperCase()}] ${message}`, data);
      } else {
        consoleMethod(`[${level.toUpperCase()}] ${message}`);
      }
    }

    // In production, you can send to a logging service
    // Example: Send to Sentry, LogRocket, or your own logging endpoint
    if (this.isProduction && level === 'error') {
      // TODO: Integrate with production logging service
      // Example: Sentry.captureException(data instanceof Error ? data : new Error(message));
      // Example: LogRocket.captureException(data instanceof Error ? data : new Error(message));
      
      // For now, we still log errors in production console for debugging
      // Remove this once you've integrated a proper logging service
      if (data) {
        console.error(`[PROD ERROR] ${message}`, data);
      } else {
        console.error(`[PROD ERROR] ${message}`);
      }
    }
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: unknown): void {
    this.log('error', message, error);
  }
}

// Export singleton instance
const logger = new Logger();
export default logger;
