module.exports = function mapping(input, sinkExchange) {
    const body = input.body;

    const policyData = sinkExchange.resolveContext('policyData');

    if (policyData.dimensions.amendmentType === 'Technical' && body.basicConditions.invoiceOnActivation) {
        return {
            contractNumbers: [input.number],
            postingDescription: 'Policy with technical amendment cancellation',
        };
    }
};
