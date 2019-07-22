const winston = require('winston')
require('winston-daily-rotate-file');
const path = require('path')

const infoPath = path.join(process.env.LOG_DIR, 'info-%DATE%.log')
const errorPath = path.join(process.env.LOG_DIR, 'error-%DATE%.log')
const debugPaugth = path.join(process.env.LOG_DIR, 'debug-%DATE%.log')

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: winston.format.simple(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.DailyRotateFile({
            level:'error',
            filename: errorPath,
            datePattern:'YYYY-MM-DD'
        }),
        new winston.transports.DailyRotateFile({
            level:'info',
            filename: infoPath,
            datePattern:'YYYY-MM-DD'
        }),
        new winston.transports.DailyRotateFile({
            level:'debug',
            filename: debugPaugth,
            datePattern:'YYYY-MM-DD'
        }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

var consoleLog = console.log
var consoleInfo= console.info
var consoleError= console.error

function newLog(data) {
    console.log = consoleLog
    logger.log(process.env.LOG_LEVEL,data)
    consoleLog = console.log
}
function newError(data) {
    console.log = consoleLog
    console.error = consoleLog
    logger.error(data)
    consoleError = console.error
    consoleLog = console.log
}
function newInfo(data) {
    console.log = consoleLog
    console.info = consoleInfo
    logger.info(data)
    consoleInfo = console.info
    consoleLog = console.log
}
console.log = newLog
console.info = newInfo
console.error = newError
module.exports = logger