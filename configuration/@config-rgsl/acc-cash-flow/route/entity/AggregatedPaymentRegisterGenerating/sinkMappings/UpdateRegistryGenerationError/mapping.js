'use static';

module.exports = function mapping({ message, input, stackTrace }, sinkExchange) {
    const body = input.body;
    const number = input.number;

    if (sinkExchange.allocationsForRegistryNotFound) {
        body.errors.push(sinkExchange.allocationsForRegistryNotFound);
    }

    if (sinkExchange.smallPaymentsNotFound) {
        body.errors.push(sinkExchange.smallPaymentsNotFound);
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
