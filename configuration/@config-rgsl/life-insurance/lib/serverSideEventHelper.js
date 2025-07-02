'use strict';

const CONTRACT_ENTITY_RELOAD = 'ContractEntityReload';

function subscribeToEventForEntityReloading(eventName, viewToReload) {
    viewToReload.unsubscribeFromEventsFromCurrentEntity(eventName);
    viewToReload.subscribeToEventsFromCurrentEntity({
        handler: {
            name: eventName,
            func: message => viewToReload.reloadEntity()
        },
        filter: {
            eventTypes: [eventName],
            subscribeToOwnEvents: true
        }
    });
}

function reloadContractEntityOnUpdate(viewToReload) {
    subscribeToEventForEntityReloading(CONTRACT_ENTITY_RELOAD, viewToReload);
}

module.exports = {
    subscribeToEventForEntityReloading,
    reloadContractEntityOnUpdate
};
