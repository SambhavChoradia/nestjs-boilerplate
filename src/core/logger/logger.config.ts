export const fileConf = {
    filename: 'logs/logs.log',
    handleExceptions: true,
    maxsize: 1048576, // 1GB
    maxFiles: 10,
    level: 'debug'
};

export const consoleConf = {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamp: true,
};
