module.exports = function mapping(lineInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    originalDocumentId: sinkExchange.createdPolicyId,
                    versionStateWithNull: 'Applied'
                }
            }
        }
    };

};
