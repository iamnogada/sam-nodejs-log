const winston = require('winston')
require('winston-daily-rotate-file');
const path = require('path')

const logfile = path.join(process.env.LOG_DIR, 'log-%DATE%.log')

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: winston.format.simple(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.DailyRotateFile({
            level:process.env.LOG_LEVEL,
            filename: logfile,
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
    if('debug' != process.env.LOG_LEVEL){
        console.log(data)
    }else{
        logger.log('debug',data)
    }
    
    consoleLog = console.log
}
function newError(data) {
    console.log = consoleLog
    console.error = consoleError
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