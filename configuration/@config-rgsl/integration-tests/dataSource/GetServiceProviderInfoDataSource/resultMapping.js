module.exports = function resultMapping(input) {

    if (input.length === 1) {
        input = input[0];

        return {
            serviceProviderCode: input.SERVICE_PROVIDER_CODE,
        };
    }
};

