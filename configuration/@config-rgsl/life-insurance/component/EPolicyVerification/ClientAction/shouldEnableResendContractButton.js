'use strict';

module.exports = function shouldEnableResendContractButton(input, ambientProperties) {

    const state = input.context.State;
    const issueForm = input.context.Body.issueForm?.code?.issueFormCode;

    if (state.Code !== 'Draft' && issueForm === 'ePolicy') {

        return true;
    }

    return false;
};


