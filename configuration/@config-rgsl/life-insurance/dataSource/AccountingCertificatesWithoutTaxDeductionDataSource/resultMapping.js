
module.exports = function resultMapping(input) {

    const output = {};

    output.documentId = input.UNIVERSAL_VERSIONED_DOCUMENT_ID;
    output.documentNo = input.UNIVERSAL_VERSIONED_DOCUMENT_NUMBER;
    output.accountingYear = input.ACCOUNTING_YEAR;
    output.correctionNumber = input.CORRECTION_NUMBER;
    output.contractNumber = input.CONTRACT_NUMBER;

    return output;
};
