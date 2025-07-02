'use strict';

const {
    states, actors, accountingAttachmentsTabId
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function tabAttachmentsEnter(input) {

    const state = input.context.State.Code;
    const currentActor = input.context.WorkUnitActor.CurrentActor;

    if (currentActor === actors.AccountingCertificateViewer
        || ((state === states.Cancelled || state === states.Checked || state === states.Issued) && currentActor === actors.AccountingCertificateEditor)
    ) {
        this.disableTab(accountingAttachmentsTabId);
    }
    else {
        this.enableTab(accountingAttachmentsTabId);
    }
};
