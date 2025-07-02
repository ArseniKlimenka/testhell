'use strict';

const {
    readyForExcelString,
    readyForExcelBoolean,
    convertArrayDate
} = require('@config-rgsl/life-insurance/lib/excelExportHelper');

const {
    stringAttributesArr,
    dateAttributesArr,
    booleanAttributesArr,
    issueDateStrConst
} = require('@config-rgsl/life-insurance/lib/strategyConfHelper');

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

const emptyText = '';

module.exports = function resultMapping(input) {

    const stringAttributes = [...stringAttributesArr, ...dateAttributesArr];
    readyForExcelString(input, stringAttributes);
    readyForExcelBoolean(input, booleanAttributesArr);
    convertArrayDate(input, issueDateStrConst);

    const result = input.data.map((item, index) => {

        const resultData = item.resultData;

        return {
            ruleNumber: index + 1 ?? emptyText,
            documentNumber: resultData.documentNumber ?? emptyText,
            enterValuesDate: dateTimeUtils.formatDate(resultData.enterValuesDate, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            partner: resultData.partnerBusinessCode ? getFormattedParameter(resultData.partnerDescription, resultData.partnerBusinessCode) : emptyText,
            agentAgreementNumber: resultData.agentAgreementExternalNumber ? (resultData.agentAgreementManualNumber ?? resultData.agentAgreementExternalNumber) + '/' + resultData.agentAgreementExternalNumber : emptyText,
            agentAgreementCommRate: resultData.agentAgreementCommRate * 100 ?? emptyText,
            product: resultData.productCode ? getFormattedParameter(resultData.productDescription, resultData.productCode) : emptyText,
            policyIssueDateStart: dateTimeUtils.formatDate(resultData.policyIssueDateStart, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            policyIssueDateEnd: dateTimeUtils.formatDate(resultData.policyIssueDateEnd, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            bipStrategyDescription: resultData.bipStrategyDescription ?? emptyText,
            insuranceTermFrom: resultData.insuranceTermFrom ?? emptyText,
            insuranceTermTo: resultData.insuranceTermTo ?? emptyText,
            currency: resultData.currencyNumericCode ? getFormattedParameter(resultData.currencyDescription, resultData.currencyNumericCode) : emptyText,
            paymentFrequencyDescription: resultData.paymentFrequencyDescription ?? emptyText,
            rorRateOfReturn: resultData.rorRateOfReturn ?? emptyText,
            scOptionPrice: resultData.scOptionPrice ?? emptyText,
            scFixRate: resultData.scFixRate ?? emptyText,
            scParticipationCoeff: resultData.scParticipationCoeff ?? emptyText,
            segment: resultData.segment ?? emptyText,
            isin: resultData.isin ?? emptyText,
            rko: resultData.rko ?? emptyText,
            motivationFromMargin: resultData.motivationFromMargin ?? emptyText,
            motivationFromProductEconomic: resultData.motivationFromProductEconomic ?? emptyText,
            skMargin: resultData.skMargin ?? emptyText,
            fundingRateSwaps: resultData.fundingRateSwaps ?? emptyText,
            laps: resultData.laps ?? emptyText,
            hedge: resultData.hedge ?? emptyText,
            clientID: resultData.clientID ?? emptyText,
            shareRF: resultData.shareRF ?? emptyText,
            shareGF: resultData.shareGF ?? emptyText,
            rvd: resultData.rvd ?? emptyText,
            fundingVersionSubFundID: resultData.fundingVersionSubFundID ?? emptyText,
            memorandumPkDate: dateTimeUtils.formatDate(resultData.memorandumPkDate, dateTimeUtils.DateFormats.CALENDAR) ?? emptyText,
            pkNumber: resultData.pkNumber ?? emptyText,
            analyticalAdjustment: resultData.analyticalAdjustment ?? emptyText,
            expectedReturnPercentAK: resultData.expectedReturnPercentAK ?? emptyText,
            insurance: resultData.insurance ?? emptyText,
            riskTransferProduct: resultData.riskTransferProduct ?? emptyText,
            comments: resultData.comments ?? emptyText
        };
    });

    return result;

};

function getFormattedParameter(description, code) {
    return description + ' (' + code + ')';
}
