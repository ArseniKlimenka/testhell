'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    return {
        requestId: input.REQUEST_ID,
        requestNumber: input.REQUEST_NUMBER,
        requestStateEn: input.REQUEST_STATE,
        requestState: translationUtils.getTranslation(
            'document/LifeInsuranceRequest/1',
            'states',
            null,
            input.REQUEST_STATE),
        typeOfRequestEn: input.TYPE_OF_REQUEST,
        typeOfRequest: translationUtils.getTranslation(
            'document/LifeInsuranceRequest/1',
            'enum',
            'typeOfRequest',
            input.TYPE_OF_REQUEST,
            'LifeInsuranceRequest'),
        amendmentReason: translationUtils.getTranslation(
            'document/LifeInsuranceRequest/1',
            'enum',
            'amendmentReason',
            input.AMENDMENT_REASON,
            'LifeInsuranceRequest'),
        requestIssueDate: input.REQUEST_ISSUE_DATE,
        requestCodeName: input.REQUEST_CODE_NAME,
        contractNumber: input.CONTRACT_NUMBER,
        recipientPartyCode: input.RECIPIENT_PARTY_CODE,
        recipientPartyFullName: input.RECIPIENT_PARTY_FULL_NAME,
        reasonForRecipient: input.REASON_FOR_RECIPIENT
    };
};
