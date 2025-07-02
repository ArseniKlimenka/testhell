'use strict';

module.exports = function clearInitiator(input, ambientProperties) {

    if (input.context.Body.initiator) {

        delete input.context.Body.initiator;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
