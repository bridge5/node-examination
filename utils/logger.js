const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf, colorize} = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

let logger = createLogger({});

if (process.env.NODE_ENV === 'production') {
    logger.add(new transports.Console({
        format: combine(
            colorize(),
            timestamp(),
            myFormat,
        ),
        level: 'debug'
    }));

} else {
    logger.add(new transports.Console({
        format: combine(
            colorize(),
            timestamp(),
            myFormat,
        ),
        level: 'debug'
    }));

}


module.exports = logger;
