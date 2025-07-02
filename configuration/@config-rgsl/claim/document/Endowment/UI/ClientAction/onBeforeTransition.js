'use strict';

module.exports = async function onBeforeTransition(input) {

    input.context.ClientViewModel.shouldShowPolicyAttachments = false;
};
