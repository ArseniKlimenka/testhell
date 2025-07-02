'use strict';

const { LocalDate } = require('@js-joda/core');

module.exports = async function onImportDocumentAction(input, ambientProperties) {

    const state = input.context.State.Code;

    input.context.Body.summary.date = input.context.AuditInfo.CreatedOn ? input.context.AuditInfo.CreatedOn.slice(0, 10) : LocalDate.now().toString();
    input.context.Body.summary.documentState = input.rootContext.State.Code;

    if (input.context.Number && state === 'Importing') {
        const FundAssetsImportHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('FundAssetsImportServerSideHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'FundAssetsImportServerSideHandler',
                func: FundAssetsImportHandler
            }
        });
    }

    if (["Importing", "Imported"].includes(state)) {
        this.view.getControlByElementId("TabLayoutImportId")?.selectTab("importingImportedDataTabID");
    }

};
