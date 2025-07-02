module.exports = function onAfterLoadFileLoadAction(input, ambientProperties) {
    const body = input.context.Body;
    if (body.bankStatementItems && body.bankStatementItems.length > 0) {
        input.context.ClientViewModel.bankStatementItemIds = body.bankStatementItems.map(_ => _.id);
        input.context.ClientViewModel.bankStatementItemNos = body.bankStatementItems.map(_ => _.no);
    }

    const state = input.context.State.Code;
    if (input.context.Number && state === 'Allocation') {
        subscribeToUpdatePage(this, state);
    }

    if (input.context.Number && state === 'Generating') {
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
