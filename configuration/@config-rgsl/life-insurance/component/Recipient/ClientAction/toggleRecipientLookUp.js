const { checkApplicantType } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function toggleRecipientLookUp(input) {
    return checkApplicantType(input);
};
