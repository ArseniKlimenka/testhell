'use strict';

module.exports = function inputMapping(input) {

    return {
        data: {
            criteria: {
                requestNumber: input.data.criteria.requestNumber,
                requestState: input.data.criteria.requestState,
                contractNumber: input.data.criteria.contractNumber,
                contractStateCode: input.data.criteria.contractStateCode,
                productCode: input.data.criteria.productCode,
                productGroup: input.data.criteria.productGroup,
                partner: input.data.criteria.partner,
                amount: input.data.criteria.amount,
                policyHolderName: input.data.criteria.policyHolderName,
                applicantName: input.data.criteria.applicantName,
                typeOfRequest: input.data.criteria.typeOfRequest,
                amendmentReason: input.data.criteria.amendmentReason,
                contractIssueDate: input.data.criteria.contractIssueDate,
                requestIssueDate: input.data.criteria.requestIssueDate,
                bankName: input.data.criteria.bankName,
                bankNumber: input.data.criteria.bankNumber
            }
        }
    };

};
