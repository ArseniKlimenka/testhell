const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { guaranteedIncome } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const emptyText = '';

module.exports = function resultMapping(input, additionalDataSources) {
    const economicParameters = additionalDataSources.EconomicParametersContractDataSource?.data;
    const allocationsData = additionalDataSources.AllocationDataSource.data;
    const result = input.data.map((item, index) => {
        const economicParametersForContract = economicParameters?.find(ep => ep.resultData.contractNumber === item.resultData.number)?.resultData;
        const allocationsForContract = allocationsData?.filter(ad => ad.resultData.refDocumentNo === item.resultData.number);
        const lastPaymentDate = dateTimeUtils.getMaxOfDates(allocationsForContract.map(a => a.resultData.bsi.paymentDate));

        let economicParametersAttributes = {};
        if (economicParametersForContract) {
            economicParametersAttributes = {
                economicParametersPeriod: dateTimeUtils.formatDate(economicParametersForContract.policyIssueDateStart, dateTimeUtils.DateFormats.CALENDAR) + '-' + dateTimeUtils.formatDate(economicParametersForContract.policyIssueDateEnd, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
                isin: economicParametersForContract.isin ?? emptyText,
                agentAgreementNumber: economicParametersForContract.agentAgreementExternalNumber ? (economicParametersForContract.agentAgreementManualNumber ?? economicParametersForContract.agentAgreementExternalNumber) + '/' + economicParametersForContract.agentAgreementExternalNumber : emptyText,
                segment: economicParametersForContract.segment ?? emptyText,
                guaranteedIncomeDescription: guaranteedIncome[Object.keys((guaranteedIncome)).filter(k => guaranteedIncome[k].code == economicParametersForContract.guaranteedIncomeCode)]?.description ?? emptyText,
                agentAgreementCommRate: economicParametersForContract.agentAgreementCommRate ?? emptyText,
                rko: economicParametersForContract.rko ?? emptyText,
                motivationFromMargin: economicParametersForContract.motivationFromMargin ?? emptyText,
                motivationFromProductEconomic: economicParametersForContract.motivationFromProductEconomic ?? emptyText,
                skMargin: economicParametersForContract.skMargin ?? emptyText,
                rorRateOfReturn: economicParametersForContract.rorRateOfReturn ?? emptyText,
                fundingRateSwaps: economicParametersForContract.fundingRateSwaps ?? emptyText,
                laps: economicParametersForContract.laps ?? emptyText,
                hedge: economicParametersForContract.hedge ?? emptyText,
                scOptionPrice: economicParametersForContract.scOptionPrice ?? emptyText,
                clientID: economicParametersForContract.clientID ?? emptyText,
                shareRF: economicParametersForContract.shareRF ?? emptyText,
                shareGF: economicParametersForContract.shareGF ?? emptyText,
                rvd: economicParametersForContract.rvd ?? emptyText,
                fundingVersionSubFundID: economicParametersForContract.fundingVersionSubFundID ?? emptyText,
                memorandumPkDate: dateTimeUtils.formatDate(economicParametersForContract.memorandumPkDate, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
                pkNumber: economicParametersForContract.pkNumber ?? emptyText,
                analyticalAdjustment: economicParametersForContract.analyticalAdjustment ?? emptyText,
                expectedReturnPercentAK: economicParametersForContract.expectedReturnPercentAK ?? emptyText,
                insurance: economicParametersForContract.insurance ?? emptyText,
                scFixRate: economicParametersForContract.scFixRate ?? emptyText,
                scParticipationCoeff: economicParametersForContract.scParticipationCoeff ?? emptyText,
                riskTransferProduct: economicParametersForContract.riskTransferProduct ?? emptyText,
                comments: economicParametersForContract.comments ?? emptyText
            };
        }

        return {
            ...economicParametersAttributes,
            ruleNumber: index + 1 ?? emptyText,
            contractNumber: item.resultData.number ?? emptyText,
            issueDate: dateTimeUtils.formatDate(item.resultData.issueDate, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            startDate: dateTimeUtils.formatDate(item.resultData.startDate, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            endDate: dateTimeUtils.formatDate(item.resultData.endDate, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            state: item.resultData.stateCodeDescription ?? emptyText,
            amount: item.resultData.amount ?? emptyText,
            lastPaymentDate: dateTimeUtils.formatDate(lastPaymentDate, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            productCode: item.resultData.productCode ?? emptyText,
            productDescription: item.resultData.productDescription ?? emptyText,
            productStrategyDescription: item.resultData.productStrategyDescription ?? emptyText,
            agent: item.resultData.partner.partnerDescription ?? emptyText,
            insuranceTerms: item.resultData.insuranceTerms ?? emptyText,
            currencyCode: item.resultData.currencyCode ?? emptyText,
            paymentFrequencyDescription: item.resultData.paymentFrequencyWithCode.paymentFrequencyDescription ?? emptyText
        };
    });

    return result;
};
