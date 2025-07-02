'use strict';

module.exports = async function afterSaveContractEntity(input, ambientProperties) {

    this.view.collapseSideContent();
};
