'use strict';
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function collectiveLifeInsurancePolicyOnLoad(input, ambientProperties) {

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
    else {

        input.rootContext.ClientViewModel.initialBody = deepCopy(input.rootContext.Body);
    }
};
