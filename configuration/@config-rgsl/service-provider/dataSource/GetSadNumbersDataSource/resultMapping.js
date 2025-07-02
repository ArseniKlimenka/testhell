module.exports = function resultMapping(input) {
    return {
        service_provider_code: input.SERVICE_PROVIDER_CODE,
        body: input.BODY && JSON.parse(input.BODY) || {},
        sadNumber1: input.SAD_NUMBER_1,
        sadNumber2: input.SAD_NUMBER_2
    };
};
