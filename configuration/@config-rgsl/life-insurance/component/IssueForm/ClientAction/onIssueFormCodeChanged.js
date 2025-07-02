const { copyPolicyHolderData, refreshView } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = function onIssueFormCodeChanged(input) {

    const body = input.rootContext.Body;
    const issueFormCode = input.data?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    if (isEPolicy) {

        body.insuredPerson.isPolicyHolder = true;
        input.data.polciyHolderIsPayer = true;
        body.basicConditions.isReinvest = false;
        copyPolicyHolderData(input);
    }
    else {

        input.data.polciyHolderIsPayer = false;
    }

    refreshView(this.view);
};
