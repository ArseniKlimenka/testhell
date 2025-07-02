'use strict';

module.exports = function onLoadDocumentAction(input, ambientProperties) {
    const state = input.context.State.Code;

    if (state === 'Draft') {
        delete input.context.Body.loadedRecords;
    }

    if (input.context.Number && state === 'Loading') {
        const InsuranceRulesLoadHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('InsuranceRulesLoadServerSideHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'InsuranceRulesLoadServerSideHandler',
                func: InsuranceRulesLoadHandler
            }
        });
    }
};
