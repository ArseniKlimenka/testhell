'use strict';

module.exports = function inputMapping(input) {

    return {
        data: {
            criteria: {
                inquiryCodeName: input.data.criteria.inquiryCodeName,
                inquiryNumber: input.data.criteria.inquiryNumber,
                inquiryState: input.data.criteria.inquiryState,
                inquiryCreatedFrom: input.data.criteria.inquiryCreatedFrom,
                inquiryCreatedTo: input.data.criteria.inquiryCreatedTo,
                documentCodeName: input.data.criteria.documentCodeName,
                reasonCode: input.data.criteria.reasonCode,
                documentNumber: input.data.criteria.documentNumber,
                contractNumber: input.data.criteria.contractNumber,
                holderCode: input.data.criteria.holderCode,
                departmentCodes: input.data.criteria.departmentCodes,
                includedInRussianPostRegister: input.data.criteria.includedInRussianPostRegister,
                russianPostRegisterInclusionDateFrom: input.data.criteria.russianPostRegisterInclusionDateFrom,
                russianPostRegisterInclusionDateTo: input.data.criteria.russianPostRegisterInclusionDateTo,
                isEndowment: input.data.criteria.isEndowment,
                isLifeInsuranceCancellation: input.data.criteria.isLifeInsuranceCancellation,
                isLifeInsuranceQuote: input.data.criteria.isLifeInsuranceQuote,
                isEndowmentAndCancellation: input.data.criteria.isEndowmentAndCancellation,
                isCancellationOrEndowmentAndQuote: input.data.criteria.isCancellationOrEndowmentAndQuote,
                isCancellationOrEndowmentOrQuote: input.data.criteria.isCancellationOrEndowmentOrQuote,
            }
        }
    };

};
