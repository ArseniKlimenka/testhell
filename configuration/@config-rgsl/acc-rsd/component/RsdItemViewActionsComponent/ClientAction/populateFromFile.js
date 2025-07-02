'use strict';

/**
 * @uses ClientAction:hideDialogButtons
 */
module.exports = async function populateFromFile(input, ambientProperties) {

    const viewDialogService = ambientProperties.services.viewDialog;

    const customData = {
        rsdNumber: input.rootContext.Number,
    };

    const dialogViewReference = {
        configurationCodeName: 'RsdPopulateFromFileView',
        configurationConceptType: 'SearchView',
        configurationVersion: '1',
    };

    const dialogParams = {
        dialogViewReference,
        customData,
        dialogSize: 'small',
        onLoad: 'hideDialogButtons',
    };

    await viewDialogService.show(dialogParams);
    this.view.search();
};
