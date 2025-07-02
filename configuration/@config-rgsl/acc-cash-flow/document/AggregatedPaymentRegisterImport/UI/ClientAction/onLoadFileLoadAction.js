'use strict';

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    const state = input.context.State.Code;

    if (input.context.Number && state === 'Loading') {
        subscribeToUpdatePage(this, state);
    }

    if (input.context.Number && state === 'Importing') {
        subscribeToUpdatePage(this, state);
    }
};

function subscribeToUpdatePage(self, state) {
    const handlerName = 'aggregatedPaymentRegistry' + state + 'ServerSideHandler';

    const registryLoadHandler = (message) => {
        if (message.eventType === 'StatusChanged') {
            self.unsubscribeFromEventsFromCurrentEntity(handlerName);
            self.view.reloadEntity();
        }
    };

    self.subscribeToEventsFromCurrentEntity({
        handler: {
            name: handlerName,
            func: registryLoadHandler,
        }
    });
}
