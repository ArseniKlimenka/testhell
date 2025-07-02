const { applicantType } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showApplicantLookUp(input) {

    const body = input.context.Body;
    const showApplicantLookUp = [applicantType.beneficiary, applicantType.beneficiaryRepresentative].includes(body.applicantType);

    return showApplicantLookUp;
};
