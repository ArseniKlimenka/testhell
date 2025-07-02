module.exports = function mappingFunction(lineInput, sinkExchange) {

    const result = {
        businessNumber: sinkExchange.createdPolicyNumber,
        transition: {
            transitionName: "OperationsApproval_to_POCreation",
            configurationName: "CreditLifeInsuranceCancellation",
            configurationVersion: "1"
        }
    };

    return result;
};
