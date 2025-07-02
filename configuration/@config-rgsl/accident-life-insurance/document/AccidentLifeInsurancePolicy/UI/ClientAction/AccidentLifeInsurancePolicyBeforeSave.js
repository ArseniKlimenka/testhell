
const { deleteEPolicyAttachments } = require('@config-rgsl/life-insurance/lib/ePolicyHelper');

module.exports = async function AccidentLifeInsurancePolicyBeforeSave(input, ambientProperties) {

    const issueFormCode = input.rootContext?.Body?.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    if (!isEPolicy) {

        await deleteEPolicyAttachments(this.view.attachmentManager, input);
    }
};
