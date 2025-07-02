'use strict';

module.exports = function onLoadDocumentAction(input, ambientProperties) {
    const state = input.context.State.Code;
    const handlerName = ambientProperties.configurationCodeName + 'ServerSideHandler';

    const statesForEvents = [
        'Loading',
        'Importing',
        'AllocationCancellation',
        'PaymentCancellation',
    ];
    if (input.context.Number && statesForEvents.includes(state)) {
        const eventHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity(handlerName);
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: handlerName,
                func: eventHandler,
            }
        });
    }
};
