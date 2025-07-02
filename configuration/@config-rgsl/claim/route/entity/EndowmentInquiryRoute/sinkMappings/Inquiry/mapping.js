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

    const inquiryReasons = body.inquiryReasons ?? [];

    const result = {

        'EWT_IMPL.ENDOWMENT_INQUIRY_HUB': [{
            INQUIRY_NUMBER: number
        }],

        'EWT_IMPL.ENDOWMENT_INQUIRY_SAT': [{
            INQUIRY_NUMBER: number,
            STATE: state,
            DEPARTMENT_CODE: body.department.code,
            CONTRACT_NUMBER: body.contractNumber,
            CONTRACT_HOLDER_NAME: body.holder,
            CONTRACT_CONF_CODE_NAME: body.contractConfigurationCodeName,
            TEXT_OF_INQUIRY: body.textOfInquiry,
            TEXT_OF_ANSWER: body.textOfAnswer,
            TEXT_OF_COMMENT: body.textOfComment,
            INCLUDED_IN_RP_REGISTER: body.includedInRussianPostRegister,
            INCLUSION_DATE_RP_REGISTER: body.inclusionDateRussianPostRegister
        }],

        'EWT_IMPL.ENDOWMENT_INQUIRY_REASON_SAT': [
            {
                $deleted: true,
                INQUIRY_NUMBER: number
            }
        ],

        'EWT_IMPL.EWT_INQUIRY_LINK': [{
            ENDOWMENT_NUMBER: body.endowmentNumber,
            INQUIRY_NUMBER: number
        }]

    };

    inquiryReasons.forEach(inquiryReason => {

        if (inquiryReason.code) {
            result['EWT_IMPL.ENDOWMENT_INQUIRY_REASON_SAT'].push({
                INQUIRY_NUMBER: number,
                REASON_CODE: inquiryReason.code
            });
        }

    });

    return result;

};
