'use strict';

module.exports = async function onLoad(input, ambientProperties) {

    // UI refreshing because of async transitions in entity routes
    if (input.context.Number) {
        const requestStatusChangedHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('requestStatusChangedHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'requestStatusChangedHandler',
                func: requestStatusChangedHandler
            }
        });
    }
};
