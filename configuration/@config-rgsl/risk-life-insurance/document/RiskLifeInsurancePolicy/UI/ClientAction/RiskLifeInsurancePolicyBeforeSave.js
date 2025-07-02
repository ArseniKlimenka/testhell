
const { deleteEPolicyAttachments } = require('@config-rgsl/life-insurance/lib/ePolicyHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function RiskLifeInsurancePolicyBeforeSave(input, ambientProperties) {

    const issueFormCode = getValue(input.rootContext.Body, 'issueForm.code.issueFormCode', '');
    const isEPolicy = issueFormCode == 'ePolicy';

    if (!isEPolicy) {

        await deleteEPolicyAttachments(this.view.attachmentManager, input);
    }
};
