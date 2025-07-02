const { rsdStatusIds } = require('@config-rgsl/acc-rsd/lib/rsdConsts');

module.exports = async function onLoad(input, ambientProperties) {

    if (input.context.Number) {
        this.view.getControlByElementId('rsdItemInlineView').showElement();
    }

    const state = input.context.State.Code;
    if (input.context.Number && state === rsdStatusIds.COMPLETING) {
        const handlerName = 'rsdCompletingServerSideHandler';

        const handler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity(handlerName);
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: handlerName,
                func: handler
            }
        });
    }
};
