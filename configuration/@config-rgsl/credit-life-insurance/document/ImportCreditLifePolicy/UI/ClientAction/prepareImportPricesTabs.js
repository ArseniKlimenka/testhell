'use strict';

module.exports = function prepareImportPricesTabs(input) {

    // Draft, Loading*, Loaded, Importing*, Imported
    const stateCode = input.context.State.Code;
    const processingStates = ['Importing', 'Imported'];

    if (stateCode === 'Draft') {
        this.hideTab('tab-LoadedData');
    } else {
        this.showTab('tab-LoadedData');
    }

    if (processingStates.includes(stateCode)) {
        this.showTab('tab-ImportedData');
    } else {
        this.hideTab('tab-ImportedData');
    }
};
