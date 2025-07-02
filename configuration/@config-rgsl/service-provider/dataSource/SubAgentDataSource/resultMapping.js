module.exports = function resultMapping(input) {
    return {
        service_provider_code: input.SERVICE_PROVIDER_CODE,
        service_provider_body: JSON.parse(input.SERVICE_PROVIDER_BODY),
        party_code: input.PARTY_CODE
    };
};
