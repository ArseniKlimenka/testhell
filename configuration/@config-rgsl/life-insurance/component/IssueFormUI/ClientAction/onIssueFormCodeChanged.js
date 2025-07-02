const { copyPolicyHolderData, refreshView } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = function onIssueFormCodeChanged(input) {

    const body = input.additionalContext.body;
    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    if (isEPolicy) {

        body.insuredPerson.isPolicyHolder = true;
        body.issueForm.polciyHolderIsPayer = true;
        body.basicConditions.isReinvest = false;
        copyPolicyHolderData(input);
    }
    else {

        body.issueForm.polciyHolderIsPayer = false;
    }

    refreshView(this.view);
};
