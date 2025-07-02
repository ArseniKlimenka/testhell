'use strict';

const { LocalDate } = require('@js-joda/core');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function onImportDocumentAction(input, ambientProperties) {
    const state = input.context.State.Code;

    input.context.Body.summary.date = input.context.AuditInfo.CreatedOn ? dateTimeUtils.formatDate(input.context.AuditInfo.CreatedOn) : LocalDate.now().toString();
    input.context.Body.summary.documentState = input.rootContext.State.Code;

    if (input.context.Number && state === 'Importing') {
        const ContractEntityAttributesImportHandler = (message) => {
            if (message.eventType === 'StatusChanged') {
                this.unsubscribeFromEventsFromCurrentEntity('ContractEntityAttributesImportServerSideHandler');
                this.view.reloadEntity();
            }
        };

        this.subscribeToEventsFromCurrentEntity({
            handler: {
                name: 'ContractEntityAttributesImportServerSideHandler',
                func: ContractEntityAttributesImportHandler
            }
        });
    }

    if (["Importing", "Imported"].includes(state)) {
        this.view.getControlByElementId("TabLayoutImportId")?.selectTab("importingImportedDataTabID");
    }

};
