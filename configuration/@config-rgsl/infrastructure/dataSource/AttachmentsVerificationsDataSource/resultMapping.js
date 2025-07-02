'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};
    const state = input.STATE;

    output.verificationDocumentNumber = input.VERIFICATION_NUMBER;
    output.verificationState = input.STATE;
    output.verificationState = state ? translationUtils.getTranslation(`document/LifeInsuranceAttachmentVerification/1`, 'states', null, state) : '';

    if (state == "Issued") {
        output.verificationDate = input.LOAD_DATE;
    }

    return output;

};
