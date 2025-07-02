const { applicantType } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { getPolicyHolderData } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = async function applicantTypeOnChange(input, ambientProperties) {
    const body = input.context.Body;

    if (body.applicantType === applicantType.policyHolder) {
        return;
    }

    body.applicant.partyData = await getPolicyHolderData(input, ambientProperties, this);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
