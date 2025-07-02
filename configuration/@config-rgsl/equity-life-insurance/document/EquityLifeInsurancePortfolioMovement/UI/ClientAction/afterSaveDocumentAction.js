'use strict';

module.exports = function afterSaveDocumentAction(input) {

    this.view.rebind();
};
