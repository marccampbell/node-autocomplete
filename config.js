var config = {};

config.logFile = './trace.log';
config.logLevel = 3;
config.respSize = 20;
config.redis_server_name = '127.0.0.1';
config.redis_server_port = 6379;
config.redis_key = 'username:account.token';

module.exports = config;
