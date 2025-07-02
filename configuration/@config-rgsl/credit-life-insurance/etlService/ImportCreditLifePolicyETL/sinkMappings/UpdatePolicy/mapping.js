module.exports = function mapping(lineInput, sinkExchange) {

    // called from route, but we need to provire RU translations
    this.applicationContext.locale = "ru-RU";

    // fill body
    sinkExchange.createdPolicyBody.commission.policyCommissionItems = sinkExchange.commissionItems;
    sinkExchange.createdPolicyBody.commission.agentAgreement.amendmentNumber = sinkExchange.calculateCommissionData.amendmentNumber;

    // fill result
    const result = {
        number: sinkExchange.createdPolicyNumber,
        body: sinkExchange.createdPolicyBody
    };

    return result;

};
