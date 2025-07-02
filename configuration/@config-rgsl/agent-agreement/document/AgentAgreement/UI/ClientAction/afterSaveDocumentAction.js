'use strict';

module.exports = function afterSaveDocumentAction(input) {

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
