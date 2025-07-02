'use strict';

const { translationUtils } = require('@adinsure/runtime');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    const result = {
        claimNumber: input.CLAIM_NUMBER,
        claimConf: input.CLAIM_CONF,
        contractNumber: input.CONTRACT_NUMBER,
        contractConfigurationName: input.CONTRACT_CONF_CODE_NAME,
        contractConfigurationVersion: '1',
        contractStateCode: input.CONTRACT_STATE_ID?.toString(),
        contractStateDescription: translationUtils.getTranslation(`document/${input.CONTRACT_CONF_CODE_NAME}/1`, 'states', null, input.CONTRACT_STATE_NAME),
        documentState: translationUtils.getTranslation(`document/Claim/1`, 'states', null, input.CLAIM_STATE_NAME),
        documentStateCode: input.CLAIM_STATE_ID?.toString(),
        insuredEvent: {
            insuredEventNumber: input.IE_NUMBER,
            insuredEventDate: input.IE_DATE
                ? DateTimeUtils.formatDate(input.IE_DATE)
                : undefined,
        },

        applicationInfo: {
            applicantFullName: input.APPLICANT_FULL_NAME
        },

        insuredPersonInfo: {
            insuredPersonFullName: input.INSURED_NAME
        },

        policyHolderInfo: {
            policyHolderFullName: input.HOLDER_NAME
        }
    };

    return result;
};
