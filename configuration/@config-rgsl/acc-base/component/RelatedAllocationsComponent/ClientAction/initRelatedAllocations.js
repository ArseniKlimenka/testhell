'use strict';

const { actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { bankStatementItemSourceId } = require("@config-rgsl/acc-base/lib/bankStatementEnums");

module.exports = function initRelatedAllocations(input) {

    const currentView = this.getCurrentView();
    const isOperations = input.context.WorkUnitActor.CurrentActor === actor.Operations;

    currentView.setSearchRequest({
        data: {
            criteria: {
                refDocumentNo: input.rootContext.Number,
                isNotCancelled: !isOperations,
                bankStatementItemSourceIds: [
                    bankStatementItemSourceId.BANK_STATEMENT,
                    bankStatementItemSourceId.REGISTRY,
                    bankStatementItemSourceId.PAYMENT_ORDER,
                ],
            }
        }
    });
    currentView.setProtectedFields(['refDocumentNo', 'isNotCancelled'], false);

    currentView.search();
};
