module.exports = function resultMapping(input) {

    const result = {
        allocationId: input.ALLOCATION_ID,
        cancelled: input.CANCELLED,
        cancelledAllocationId: input.CANCELLED_ALLOCATION_ID,
        payAmount: input.PAY_AMOUNT,
        docAmount: input.DOC_AMOUNT,
        toleranceDocAmount: input.TOLERANCE_DOC_AMOUNT,
        payCurrencyCode: input.PAY_CURRENCY_CODE,
        documentNo: input.DOCUMENT_NO,
        documentTypeId: input.DOCUMENT_TYPE_ID,
        docCurrencyCode: input.DOC_CURRENCY_CODE,
        matchings: undefined,
    };

    if (input.MATCHINGS) {
        result.matchings = JSON.parse(input.MATCHINGS).map(_ => ({
            matchingId: _.MATCHING_ID,
            cancelled: _.CANCELLED,
            cancelledMatchingId: _.CANCELLED_MATCHING_ID,
            docAmount: _.DOC_AMOUNT,
            toleranceDocAmount: _.TOLERANCE_DOC_AMOUNT,
            objectCode: _.OBJECT_CODE,
            sourceLineId: _.SOURCE_LINE_ID,
            isLife: _.IS_LIFE,
            postAmount: _.POST_AMOUNT,
            isPosted: _.IS_POSTED,
            postingDate: _.POSTING_DATE,
        }));
    }

    return result;
};

