const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function resultMapping(input) {

    const result = input.data.map((item, index) => {
        return {
            "rowNumber": index + 1,
            "contractNumber": item.resultData.contractNumber ? item.resultData.contractNumber : '',
            "amendmentNumber": item.resultData.amendmentNumber ? item.resultData.amendmentNumber : '',
            "contractIssueDate": item.resultData.contractIssueDate ? item.resultData.contractIssueDate : '',
            "amendmentIssueDate": item.resultData.amendmentIssueDate ? item.resultData.amendmentIssueDate : '',
            "contractState": item.resultData.contractState ? item.resultData.contractState : '',
            "amendmentType": item.resultData.amendmentType ? amendmentTypesTranslationMap[item.resultData.amendmentType] : '',
            "contractEndDate": item.resultData.contractEndDate ? item.resultData.contractEndDate : '',
            "policyHolderCode": item.resultData.policyHolderCode ? item.resultData.policyHolderCode : '',
            "endowmentPremium": item.resultData.endowmentPremium ? item.resultData.endowmentPremium : '',
            "coolOffPeriodEndDate": item.resultData.coolOffPeriodEndDate ? item.resultData.coolOffPeriodEndDate : '',
            "coolOffPeriodEndDatePlus1": item.resultData.coolOffPeriodEndDatePlus1 ? item.resultData.coolOffPeriodEndDatePlus1 : '',
            "coolOffPeriodEndDatePlus5": item.resultData.coolOffPeriodEndDatePlus5 ? item.resultData.coolOffPeriodEndDatePlus5 : '',
            "unitInitialCost": item.resultData.unitInitialCost ? item.resultData.unitInitialCost : '',
            "cancellationDate": item.resultData.cancellationDate ? item.resultData.cancellationDate : '',
            "strategyName": item.resultData.strategyName ? item.resultData.strategyName : '',
            "isin": item.resultData.isin ? item.resultData.isin : '',
            "share": item.resultData.share ? item.resultData.share : '',
            "mf": item.resultData.mf ? item.resultData.mf : '',
        };
    });

    return result;
};

const amendmentTypesTranslationMap = Object.freeze({
    [equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation]: 'Расторжение после периода охлаждения',
    [equityLifeInsuranceAmendments.EquityLifeInsuranceNonFinChange]: 'Инвест. изменения'
});
