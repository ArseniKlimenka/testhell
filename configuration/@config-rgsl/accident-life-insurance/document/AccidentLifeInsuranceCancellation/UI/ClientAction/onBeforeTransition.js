'use strict';

module.exports = async function onBeforeTransition(input, ambientProperties) {

    input.context.ClientViewModel.shouldShowPolicyAttachments = false;
    input.context.ClientViewModel.shouldShowHolderAttachments = false;
};

