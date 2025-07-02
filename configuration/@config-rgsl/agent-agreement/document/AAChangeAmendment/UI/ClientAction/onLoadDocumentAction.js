'use strict';

const { isSaveOperationAvailable, refreshView } = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');
const { getUniversalSetFunctionObject } = require('@config-rgsl/agent-agreement-base/lib/AAValidationHelper');
const { documentEditMode } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {

    input.rootContext.ClientViewModel.documentEditMode = documentEditMode.changeAmendment;

    const isDocumentLocked = !isSaveOperationAvailable(this.view);

    if (isDocumentLocked) {

        this.view.disableAllElements();
    }

    const functionsObject = getUniversalSetFunctionObject(ambientProperties);
    input.rootContext.ClientViewModel.productsList = await functionsObject.getAllInsuranceProducts();
    input.rootContext.ClientViewModel.creditProgramList = await functionsObject.getAllCreditPrograms();

    refreshView(this.view);
};
