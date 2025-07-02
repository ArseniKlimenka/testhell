'use strict';

module.exports = function onLoadDocumentAction(input, ambientProperties) {

    const state = input.context.State.Code;

    if (state === 'Draft') {
        delete input.context.Body.loadedRecords;
    }

    if (input.context.Number && (state === 'Loading' || state === 'Validating')) {
        const FundLoadHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('FundLoadServerSideHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'FundLoadServerSideHandler',
                func: FundLoadHandler
            }
        });
    }

    if (["Loading", "Loaded", "ValidationError"].includes(state)) {
        this.view.getControlByElementId("TabLayoutLoadId").selectTab("loadingLoadedDataTabID");
    }

    if (state === 'ValidationError') {
        ambientProperties.services.confirmationDialog.showError(`Валидация загруженных данных завершена с ошибками, исправьте ошибки и перезагрузите файл импорта!`, 'OK', 'OK', 2);
    }
};
