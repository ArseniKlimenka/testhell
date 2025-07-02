'use strict';

/**
 * @uses ClientAction:hideDialogButtons
 */
module.exports = async function populateFromFile(input, ambientProperties) {
    const actId = input.rootContext.Body.actId;
    const lastUpdated = input.rootContext.Body.lastUpdated;

    const viewDialogService = ambientProperties.services.viewDialog;

    const customData = {
        actId: actId,
        actNo: input.rootContext.Number,
        lastUpdated: lastUpdated,
    };

    const dialogViewReference = {
        configurationCodeName: 'PopulateFromFileView',
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
};
