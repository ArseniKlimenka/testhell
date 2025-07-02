const { applicantType } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showApplicantFullName(input) {

    const body = input.context.Body;
    const showApplicantFullName = !body.applicantType || body.applicantType === applicantType.policyHolder;

    return showApplicantFullName;
};
