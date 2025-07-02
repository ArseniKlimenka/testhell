module.exports = function mappingFunction(input, sinkExchange) {
    const configurationName = sinkExchange.resolveContext('configurationName');
    const createdPolicyNumber = sinkExchange.resolveContext('createdPolicyNumber');
    const validationErrors = sinkExchange.resolveContext('validationErrors');

    if (validationErrors?.length > 0) {
        return;
    }

    const request = [
        {
            businessNumber: createdPolicyNumber,
            transition: {
                transitionName: 'Draft_to_Active',
                configurationName: configurationName,
                configurationVersion: '1',
                skipIfNotAvailable: true
            }
        }
    ];

    return request;
};
