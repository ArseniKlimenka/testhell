'use strict';

module.exports = function onBeforeTransition(input, ambientProperties) {

    input.context.ClientViewModel.shouldShowExternalAttachments = false;
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

