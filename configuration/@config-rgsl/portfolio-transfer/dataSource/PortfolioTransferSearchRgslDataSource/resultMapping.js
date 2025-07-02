
module.exports = function resultMapping(input) {

    return {
        documentNo: input.PORTFOLIO_TRANSFER_NUMBER,
        issueDate: input.ISSUE_DATE,
        stateCode: input.DOCUMENT_STATE,
        aaNumberTo: input.AA_NUMBER_TO,
        serviceProviderCodeTo: input.SERVICE_PROVIDER_CODE_TO,
        sadNumberTo: input.SAD_NUMBER_TO,
    };
};
