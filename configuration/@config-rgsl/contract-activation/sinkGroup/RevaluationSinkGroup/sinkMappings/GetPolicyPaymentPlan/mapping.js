module.exports = function mapping(input, sinkExchange) {
    const policyInfos = sinkExchange.resolveContext('policyInfos');
    if (policyInfos.length === 0) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: policyInfos.map(_ => _.contractNumber),
                }
            }
        }
    };
};
