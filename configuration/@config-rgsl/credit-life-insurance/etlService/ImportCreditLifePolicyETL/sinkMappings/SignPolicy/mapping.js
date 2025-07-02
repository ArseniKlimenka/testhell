module.exports = function mappingFunction(lineInput, sinkExchange) {

    return {
        businessNumber: sinkExchange.createdPolicyNumber
    };

};
