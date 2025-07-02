const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function onLoad(input, ambientProperties) {

    const state = input.context.State.Code;

    if (input.context.Number && state === 'TransferProcessing') {
        const portfolioTransferLoadHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('portfolioTransferLoadServerSideHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'portfolioTransferLoadServerSideHandler',
                func: portfolioTransferLoadHandler,
            }
        });
    }

    if (!input.context.Body.issueDate) {

        input.context.Body.issueDate = dateUtils.dateNow();
    }
};
