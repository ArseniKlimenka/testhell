'use strict';

const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

const {
    documentStates,
    documentActors
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

const { investmentParametersEditClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

const disableBankAccountInStates = [
    documentStates.Issued,
    documentStates.Correction,
    documentStates.CancelWithoutPayment,
    documentStates.RefusalToTerminateByPolicyholder,
    documentStates.Cancelled,
    documentStates.CreateAmendment
];

const disableBankAccountForActors = [
    documentActors.Agent,
    documentActors.GeneralBackOffice,
    documentActors.Operations
];

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function disableBankAccount(input, ambientProperties) {

    const documentStateCode = input.context?.State?.Code;
    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;

    const changeClass = input.context.Body.changeClass;
    const isDisableBankAccountForClasses = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);

    if ((disableBankAccountInStates.includes(documentStateCode) && disableBankAccountForActors.includes(currentWorkUnitActor) || (currentWorkUnitActor == documentActors.Agent && isDisableBankAccountForClasses) || !isSaveOperationAvailable(this.view))) {
        return true;
    }

};
