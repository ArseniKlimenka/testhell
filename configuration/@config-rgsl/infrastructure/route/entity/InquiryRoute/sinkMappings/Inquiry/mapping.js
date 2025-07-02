'use strict';

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

    return {
        'PAS_IMPL.INQUIRY_HUB': [{
            INQUIRY_NUMBER: number
        }],
        'PAS_IMPL.INQUIRY_SAT': [{
            INQUIRY_NUMBER: number,
            STATE: state,
            DEPARTMENT_CODE: body.inquiry.department.code,
            CONTRACT_NUMBER: body.inquiry.quoteNumber,
            CONTRACT_HOLDER_NAME: body.inquiry.holder,
            CONTRACT_CONF_CODE_NAME: body.inquiry.configurationCodeName,
            TEXT_OF_INQUIRY: body.inquiry.textOfInquiry,
            TEXT_OF_ANSWER: body.inquiry.textOfAnswer,
            TEXT_OF_COMMENT: body.inquiry.textOfComment,
            INCLUDED_IN_RP_REGISTER: body.inquiry.includedInRussianPostRegister,
            INCLUSION_DATE_RP_REGISTER: body.inquiry.inclusionDateRussianPostRegister,
            POLICY_REVIEW_NUMBER: body.inquiry.policyReviewNumber
        }],
        'PAS_IMPL.QUOTE_INQUIRY_LINK': [{
            CONTRACT_NUMBER: body.inquiry.quoteNumber,
            INQUIRY_NUMBER: number
        }]
    };
};
