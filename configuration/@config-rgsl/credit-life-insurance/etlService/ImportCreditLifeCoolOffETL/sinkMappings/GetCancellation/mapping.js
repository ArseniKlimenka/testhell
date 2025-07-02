module.exports = function mapping(lineInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumberStrict: sinkExchange.createdPolicyNumber
                }
            }
        }
    };

};
