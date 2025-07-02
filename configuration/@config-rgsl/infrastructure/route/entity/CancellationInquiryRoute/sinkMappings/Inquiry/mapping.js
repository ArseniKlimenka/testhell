'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

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

    const inquiryReasons = getValue(body, 'inquiryReasons', []);

    const result = {

        'PAS_IMPL.INQUIRY_HUB': [{
            INQUIRY_NUMBER: number
        }],

        'PAS_IMPL.INQUIRY_SAT': [{
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

        'PAS_IMPL.INQUIRY_REASON_SAT': [
            {
                $deleted: true,
                INQUIRY_NUMBER: number
            }
        ],

        'PAS_IMPL.CNL_INQUIRY_LINK': [{
            AMENDMENT_NUMBER: body.cancellationNumber,
            INQUIRY_NUMBER: number
        }]

    };

    inquiryReasons.forEach(inquiryReason => {

        if (inquiryReason.code) {
            result['PAS_IMPL.INQUIRY_REASON_SAT'].push({
                INQUIRY_NUMBER: number,
                REASON_CODE: inquiryReason.code
            });
        }

    });

    return result;

};
