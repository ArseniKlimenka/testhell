'use strict';

module.exports = function onLoadDocumentAction(input, ambientProperties) {
    const state = input.context.State.Code;

    if (state === 'Draft') {
        delete input.context.Body.loadedRecords;
    }

    if (input.context.Number && state === 'Loading') {
        const bankStatementLoadHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('bankStatementLoadServerSideHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'bankStatementLoadServerSideHandler',
                func: bankStatementLoadHandler
            }
        });
    }
};
