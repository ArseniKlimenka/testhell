'use strict';

module.exports = function registerServerSideHandlers(input) {
    const state = input.context.State.Code;

    if (input.context.Number && (state === 'Loading' || state === 'Importing')) {
        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'importFundsServerSideHandler',
                func: (message) => {
                    if (message.eventType === 'StatusChanged') {
                        this.unsubscribeFromEventsFromCurrentEntity('importFundsServerSideHandler');
                        this.view.reloadEntity();
                    }
                }
            }
        });
    }

};
