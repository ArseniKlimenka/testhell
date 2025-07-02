"use strict";

module.exports = function mapping(input, result) {

    if (!result) {

        return;
    }

    if (result.errorResponse?.code) {

        throw `${result.errorResponse.message} ${result.errorResponse.additionalErrorData?.message}`;
    }

    const contractData = result.contractData;
    input.contractStartDate = contractData.contractStartDate;
    input.contractIssueDate = contractData.contractIssueDate;
    input.contractStartDateFormated = contractData.contractStartDateFormated;
    input.contractIssueDateFormated = contractData.contractIssueDateFormated;
    input.contractType = contractData.contractType;
    input.holderFullName = contractData.holderFullName;
    input.insuredFullName = contractData.insuredFullName;
    input.contractCurrency = contractData.contractCurrency;
    input.contractCurrencyDescription = contractData.contractCurrencyDescription;
    input.riskBusinessLine = contractData.riskBusinessLine;

    const claimData = result.claimData;
    input.riskInsuredSum = claimData.riskInsuredSum;
    input.riskInsuredSumFormated = claimData.riskInsuredSumFormated;
    input.riskDescription = claimData.riskDescription;
    input.riskCode = claimData.riskCode;
    input.diagnosisDescription = claimData.diagnosisDescription;
    input.insuredEventTypeDescription = claimData.insuredEventTypeDescription;
    input.insuredEventReasonDescription = claimData.insuredEventReasonDescription;
    input.paymentType = claimData.paymentType;
    input.beneficiaryReason = claimData.beneficiaryReason;
    input.paymentDescription = claimData.paymentDescription;
    input.relatedClaims = claimData.relatedClaims;

    input.previousPayments = !!result.previousPayments && result.previousPayments.length > 0 ? result.previousPayments : 'НЕТ';
};
