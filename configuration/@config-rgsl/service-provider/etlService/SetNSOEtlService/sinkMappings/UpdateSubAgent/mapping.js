module.exports = function mapping(input, sinkExchange) {

    const { body, sadNumber, service_provider_code } = input;

    body.sadNumberNSO = sadNumber;

    return {
        body,
        code: service_provider_code
    };
};
