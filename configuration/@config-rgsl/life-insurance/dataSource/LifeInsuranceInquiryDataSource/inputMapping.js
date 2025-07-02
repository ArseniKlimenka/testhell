'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};

    if (!input.data.criteria.documentCodeName || input.data.criteria.documentCodeName?.length == 0) {
        input.data.criteria.documentCodeName = ['LifeInsuranceQuote', 'Endowment', 'LifeInsuranceCancellation'];
    }

    const documentCodeName = input.data.criteria?.documentCodeName;
    const departmentCodes = input.data.criteria?.departmentCodes;

    const isEndowment = documentCodeName.includes('Endowment');
    const isLifeInsuranceQuote = documentCodeName.includes('LifeInsuranceQuote');
    const isLifeInsuranceCancellation = documentCodeName.includes('LifeInsuranceCancellation');

    output.parameters.isEndowment = isEndowment;
    output.parameters.isLifeInsuranceQuote = isLifeInsuranceQuote;
    output.parameters.isLifeInsuranceCancellation = isLifeInsuranceCancellation;
    output.parameters.isEndowmentAndCancellation = isEndowment && isLifeInsuranceCancellation;
    output.parameters.isCancellationOrEndowmentAndQuote = (isLifeInsuranceCancellation || isEndowment) && isLifeInsuranceQuote;
    output.parameters.isCancellationOrEndowmentOrQuote = (isLifeInsuranceCancellation || isEndowment || isLifeInsuranceQuote);

    if (input.data.criteria.inquiryCodeName) {
        output.parameters.inquiryCodeName = input.data.criteria.inquiryCodeName;
    }

    if (input.data.criteria.inquiryNumber) {
        output.parameters.inquiryNumber = input.data.criteria.inquiryNumber;
    }

    if (input.data.criteria.inquiryState) {
        output.parameters.inquiryState = input.data.criteria.inquiryState;
    }

    if (input.data.criteria.inquiryCreatedFrom) {
        output.parameters.inquiryCreatedFrom = input.data.criteria.inquiryCreatedFrom;
    }

    if (input.data.criteria.inquiryCreatedTo) {
        output.parameters.inquiryCreatedTo = input.data.criteria.inquiryCreatedTo;
    }

    if (documentCodeName.length > 0) {
        output.parameters.documentCodeName = input.data.criteria.documentCodeName.toString();
    }

    if (input.data.criteria.reasonCode) {
        output.parameters.reasonCode = input.data.criteria.reasonCode;
    }

    if (input.data.criteria.documentNumber) {
        output.parameters.documentNumber = input.data.criteria.documentNumber;
    }

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.holderCode) {
        output.parameters.holderCode = input.data.criteria.holderCode;
    }

    if (departmentCodes?.length > 0) {
        output.parameters.departmentCodes = input.data.criteria.departmentCodes.toString();
    }

    if (input.data.criteria.includedInRussianPostRegister) {
        output.parameters.includedInRussianPostRegister = input.data.criteria.includedInRussianPostRegister;
    }

    if (input.data.criteria.russianPostRegisterInclusionDateFrom) {
        output.parameters.russianPostRegisterInclusionDateFrom = input.data.criteria.russianPostRegisterInclusionDateFrom;
    }

    if (input.data.criteria.russianPostRegisterInclusionDateTo) {
        output.parameters.russianPostRegisterInclusionDateTo = input.data.criteria.russianPostRegisterInclusionDateTo;
    }

    return output;

};
