'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function canEnterRejectionText(input) {

    if ((!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled())) {

        return false;
    }

    const statesToShowRejectionReason = [cancellationAmendmentState.OperationsApproval];
    const stateCode = input.context.State.Code;
    return stateCode && statesToShowRejectionReason.includes(stateCode);
};
