'use strict';

module.exports = function arePolicyVerificationFieldsEnabled(input, ambientProperties) {

    const state = input.context.State;
    const issueForm = input.context.Body.issueForm?.code?.issueFormCode;
    const currentActivity = input.context.ClientViewModel?.currentActivity;

    const transition = input.context.AvailableTransitions.find(item => item.Name === 'Draft_to_Active');

    if (state.Code !== 'Draft' || issueForm !== 'ePolicy' || !transition) {

        return false;
    }

    const currentUserId = ambientProperties.applicationContext.currentUser().getUserId();

    if (currentActivity && currentActivity.assigneeId !== currentUserId) {

        return false;
    }

    return true;
};


