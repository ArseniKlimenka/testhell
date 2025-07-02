'use static';

module.exports = function mapping({ message, input, stackTrace }, sinkExchange) {
    const body = input.body;
    const number = input.number;

    if (sinkExchange.allocationsForRegistryNotCreated) {
        body.errors.push(sinkExchange.allocationsForRegistryNotCreated);
    }

    if (message) {
        body.errors.push(message + ': ' + stackTrace);
    }

    const result = {
        body: body,
        number: number
    };

    return result;
};
