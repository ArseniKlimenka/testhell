module.exports = function mapping(lineInput, sinkExchange) {
    const validationErrors = sinkExchange.resolveContext('validationErrors');

    if (validationErrors?.length > 0) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    originalDocumentId: sinkExchange.resolveContext('createdPolicyId'),
                    versionStateWithNull: 'Applied'
                }
            }
        }
    };
};
