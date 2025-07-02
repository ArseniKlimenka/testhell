'use strict';

module.exports = function inputMapping(input) {

    return {
        data: {
            criteria: {
                accountingCertificateNumber: input.data.criteria.accountingCertificateNumber,
                accountingCertificateState: input.data.criteria.accountingCertificateState,
                contractNumber: input.data.criteria.contractNumber,
                holderPartyCode: input.data.criteria.holderPartyCode,
                insuredPartyCode: input.data.criteria.insuredPartyCode,
                applicantFullName: input.data.criteria.applicantFullName,
                requestDateFrom: input.data.criteria.requestDateFrom,
                requestDateTo: input.data.criteria.requestDateTo,
                accountingYear: input.data.criteria.accountingYear,
                correctionNumber: input.data.criteria.correctionNumber,
                certificateIssueDate: input.data.criteria.certificateIssueDate,
                hasAttachment: input.data.criteria.hasAttachment,
            }
        }
    };

};
