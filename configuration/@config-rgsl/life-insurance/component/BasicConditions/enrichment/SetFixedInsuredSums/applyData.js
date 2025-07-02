module.exports = function applyData(input) {

    const body = this.businessContext.rootData;
    const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const fixedInsuredSumsFromConfig = body.productConfiguration.fixedInsuredSums;
    const availableFixedInsuredSums = fixedInsuredSumsFromConfig && fixedInsuredSumsFromConfig[paymentFrequencyCode] && fixedInsuredSumsFromConfig[paymentFrequencyCode]['any'] || [];

    if (availableFixedInsuredSums?.length > 0) {
        this.businessContext.rootData.basicConditions.fixedInsuredSums = availableFixedInsuredSums.map(x => { return { value: x }; });
    }
};
