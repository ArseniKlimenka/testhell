'use strict';

module.exports = function onLoadDocumentAction(input, ambientProperties) {
    const state = input.context.State.Code;

    if (state === 'Draft') {
        delete input.context.Body.loadedRecords;
    }

    if (input.context.Number && state === 'Loading') {
        const RateOfReturnRulesLoadHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('RateOfReturnRulesLoadServerSideHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'RateOfReturnRulesLoadServerSideHandler',
                func: RateOfReturnRulesLoadHandler
            }
        });
    }

    if (["Loading", "Loaded"].includes(state)) {
        this.view.getControlByElementId("TabLayoutLoadId").selectTab("loadingLoadedDataTabID");
    }
};
