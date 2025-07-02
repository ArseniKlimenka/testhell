module.exports = function mapping(lineInput, sinkExchange) {
    const validationErrors = sinkExchange.resolveContext('validationErrors');

    if (validationErrors?.length > 0) {
        return;
    }

    this.applicationContext.locale = "ru-RU";
    const configurationName = sinkExchange.resolveContext('configurationName');
    const createdPolicyNumber = sinkExchange.resolveContext('createdPolicyNumber');
    const createdPolicyBody = sinkExchange.resolveContext('createdPolicyBody');
    const commissionItems = sinkExchange.resolveContext('commissionItems');
    const calculateCommissionData = sinkExchange.resolveContext('calculateCommissionData');

    createdPolicyBody.commission.policyCommissionItems = commissionItems;
    createdPolicyBody.commission.agentAgreement.amendmentNumber = calculateCommissionData.amendmentNumber;

    const request = {
        configuration: {
            name: configurationName,
            version: '1',
        },
        number: createdPolicyNumber,
        body: createdPolicyBody
    };

    return request;
};
