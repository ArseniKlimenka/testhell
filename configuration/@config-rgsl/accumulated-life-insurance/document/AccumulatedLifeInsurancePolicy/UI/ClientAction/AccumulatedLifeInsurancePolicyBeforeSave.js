const { deleteEPolicyAttachments } = require('@config-rgsl/life-insurance/lib/ePolicyHelper');

module.exports = async function AccumulatedLifeInsurancePolicyBeforeSave(input, ambientProperties) {

    await evaluatePolicy(input, ambientProperties, this);
};

async function evaluatePolicy(input, ambientProperties, self) {

    try {
        self.view.startBlockingUI();
        await self.view.evaluate([
            '/attachmentsPackage'
        ], false, true);
        self.view.stopBlockingUI();
    }
    catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }
    const issueFormCode = input?.rootContext?.Body?.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    if (!isEPolicy) {

        await deleteEPolicyAttachments(self.view.attachmentManager, input);
    }
}
