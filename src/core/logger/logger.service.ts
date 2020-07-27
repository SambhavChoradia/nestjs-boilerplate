import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { fileConf, consoleConf } from './logger.config';

const winstonLogger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    format: winston.format.combine(
        winston.format.align(),
        winston.format.printf(
            context =>
                `[${new Date().toLocaleString()}] [${context.level}] ${
                    context.message
                }`,
        ),
    ),
    transports: [
        new winston.transports.Console(consoleConf),
        new winston.transports.File(fileConf),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }),
    ],
    exitOnError: false,
});

const formatMessage = (message, contextName?) => {
    message = contextName
        ? `[${contextName}] ${message}`
        : ` ['Nest'] ${message}`;
    return message;
};

@Injectable()
export class Logger implements LoggerService {
    private contextName: string;

    setContext(context: string) {
        this.contextName = context;
    }

    log(message: any, contextName?: string) {
        if (!contextName) {
            winstonLogger.log('info', formatMessage(message, this.contextName));
        } else {
            winstonLogger.log('info', formatMessage(message));
        }
    }

    error(message: any, context?: string) {
        if (!context) {
            winstonLogger.error(formatMessage(message, this.contextName));
        } else {
            winstonLogger.error(formatMessage(message));
        }
    }

    warn(message: any, context?: string) {
        if (!context) {
            winstonLogger.warn(formatMessage(message, this.contextName));
        } else {
            winstonLogger.warn(formatMessage(message));
        }
    }

    debug(message: any, context?: string) {
        if (!context) {
            winstonLogger.debug(formatMessage(message, this.contextName));
        } else {
            winstonLogger.debug(formatMessage(message));
        }
    }

    verbose(message: any, context?: string) {
        if (!context) {
            winstonLogger.verbose(formatMessage(message, this.contextName));
        } else {
            winstonLogger.verbose(formatMessage(message));
        }
    }

    info(message: any, context?: string) {
        if (!context) {
            winstonLogger.info(formatMessage(message, this.contextName));
        } else {
            winstonLogger.info(formatMessage(message));
        }
    }
    silly(message: any, context?: string) {
        if (!context) {
            winstonLogger.silly(formatMessage(message, this.contextName));
        } else {
            winstonLogger.silly(formatMessage(message));
        }
    }
}
