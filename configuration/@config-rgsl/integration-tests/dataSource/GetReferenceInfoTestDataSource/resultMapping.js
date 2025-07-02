module.exports = function resultMapping(input) {

    return {
        referenceNo: input.REFERENCE_NO,
        documentNo: input.DOCUMENT_NO,
        currencyCode: input.CURRENCY_CODE,
        documentTypeId: input.DOCUMENT_TYPE_ID,
    };
};

