'use strict';

module.exports = async function tabAttachmentsEnter(input) {

    if (['AssetViewer'].includes(input.context.WorkUnitActor.CurrentActor)) {
        this.disableTab('assetAttachmentsTabId');
    }
    else {
        this.enableTab('assetAttachmentsTabId');
    }
};
