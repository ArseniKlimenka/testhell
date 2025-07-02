module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    sequenceNumber,
    versionState
}) {

    const result = {
        'PAS_IMPL.VERIFICATION_HUB': [{
            VERIFICATION_NUMBER: number
        }],
        'PAS_IMPL.VERIFICATION_SAT': [{
            VERIFICATION_NUMBER: number,
            STATE: state,
            SELLER_USERNAME: body.sellerUsername,
            OPERATIONS_USERNAME: body.operationsUsername,
            SELLER_COMMENT: body.attachmentErrorCommentSales,
            OPERATIONS_COMMENT: body.attachmentErrorComment
        }],
        'PAS_IMPL.POLICY_VERIFICATION_LINK': [{
            CONTRACT_NUMBER: body.number,
            VERIFICATION_NUMBER: number
        }]
    };

    result['PAS_IMPL.VERIFICATION_ERROR_SAT'] = [{
        $deleted: true,
        VERIFICATION_NUMBER: number
    }];
    if (body.attachmentErrorArray && body.attachmentErrorArray.length > 0) {
        body.attachmentErrorArray.map(item => {
            result['PAS_IMPL.VERIFICATION_ERROR_SAT'].push({
                VERIFICATION_NUMBER: number,
                ERROR_CODE: item.attachmentErrorCode,
                ERROR_DESCRIPTION_FULL: item.attachmentErrorDescriptionFull,
                ERROR_DESCRIPTION_SHORT: item.attachmentErrorDescriptionShort,
                ERROR_TYPE: item.attachmentErrorTypeOfError,
                ERROR_CLASS: item.attachmentErrorClassOfError
            });
        });
    }

    return result;

};
