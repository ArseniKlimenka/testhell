module.exports = function showPolicyHolderIsPayer(input) {

    const issueFormCode = input.data?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';

    if (isEPolicy) {

        return true;
    }

    return false;
};
