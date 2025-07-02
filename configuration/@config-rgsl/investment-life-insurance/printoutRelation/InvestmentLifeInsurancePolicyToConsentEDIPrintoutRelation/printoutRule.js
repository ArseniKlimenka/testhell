'use strict';

const { isSkipAttachmentsValidationAPI } = require('@config-rgsl/life-insurance/lib/printoutsHelper');

module.exports = function rule(input) {

    const partnerCode = input.body.mainInsuranceConditions?.partner?.partnerBusinessCode;
    const issueFormCode = input.body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    if (isEPolicy == true && isSkipAttachmentsValidationAPI(this, partnerCode)) {

        return true;
    }
};
