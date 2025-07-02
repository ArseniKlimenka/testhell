module.exports = function mapping(input, sinkExchange) {
    const serviceProviderCode = sinkExchange.resolveContext('serviceProviderCode');

    return {
        input: {
            data: {
                criteria: {
                    serviceProviderCode: serviceProviderCode
                }
            }
        }
    };
};
