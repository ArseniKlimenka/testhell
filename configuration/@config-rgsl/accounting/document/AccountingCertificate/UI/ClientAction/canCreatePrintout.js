'use strict';

const {
    states, actors
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function canCreatePrintout(input, ambientProperties) {

    const state = input.context.State.Code;
    const currentActor = input.context.WorkUnitActor.CurrentActor;

    if ((state === states.Cancelled || state === states.Issued) && currentActor !== actors.AccountingCertificateEditor) {
        return true;
    }

    if (this.view.isDirty() || !input.context.Number) {
        return true;
    }

    return false;
};
