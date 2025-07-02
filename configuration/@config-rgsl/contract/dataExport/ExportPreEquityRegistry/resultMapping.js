const { salesSegment, policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const result = input.data.map((item, index) => {
        return {
            "rowNumber": index + 1,
            "contractNumber": item.resultData.contractNumber ? item.resultData.contractNumber : '',
            "portfolioName": item.resultData.portfolioName ? item.resultData.portfolioName : '',
            "amendmentNumber": item.resultData.amendmentNumber ? item.resultData.amendmentNumber : '',
            "amendmentType": item.resultData.amendmentType ? item.resultData.amendmentType : '',
            "endowmentPremium": item.resultData.endowmentPremium ? item.resultData.endowmentPremium : '',
            "coolOffPeriodEndDatePlus1": item.resultData.coolOffPeriodEndDatePlus1 ? item.resultData.coolOffPeriodEndDatePlus1 : '',
        };
    });

    return result;
};
