'use strict';

module.exports = function onRecipientBankAccountChanged(input, ambientProperties) {

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
