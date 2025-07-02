module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('latestPolicyData', input.policyData);

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: input.contractNumber,
                }
            }
        }
    };
};
