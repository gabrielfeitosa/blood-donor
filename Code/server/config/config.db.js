var config = {};

config.db = {
    url: 'mongodb://localhost:27017/crossover',
    debug: true
};

config.server = {
    port: 8081
}

module.exports = config;