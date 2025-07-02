module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            contractNumber: item.resultData.contractNumber,
            issueDate: item.resultData.issueDate || '',
            hasPaymentIntermediateApplication: item.resultData.hasPaymentIntermediateApplication || '',
            paymentIntermediateApplicationDate: item.resultData.paymentIntermediateApplicationDate || ''
        };
    });

    return result;
};
