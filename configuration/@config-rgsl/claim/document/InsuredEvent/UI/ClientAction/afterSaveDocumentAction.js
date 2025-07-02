'use strict';

module.exports = async function afterSaveDocumentAction(input) {

    await this.view.evaluate(['[GetPolicyDates]'], false, true);
    this.view.setClean();
};
