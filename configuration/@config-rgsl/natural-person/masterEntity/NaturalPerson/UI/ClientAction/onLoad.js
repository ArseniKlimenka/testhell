'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { checkParty } = require('@config-rgsl/party/lib/naturalPersonHelper');
const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function onLoad(input, ambientProperties) {

    const duplicateMasterNumber = getValue(input, 'context.Body.partyGeneralData.duplicateMasterNumber');
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isCoach = userRoles.some(item => item.ApplicationRoleCodeName == 'Coach');
    const isCurrentUserAdmin = ambientProperties.applicationContext.isCurrentUserAdmin();
    const isPartyEditorAGENT = userRoles.some(item => item.ApplicationRoleCodeName === 'PartyEditorAGENT');
    const isSaved = input.context.IsSaved;

    if (isSaveOperationAvailable(this.view)) {

        const currentDate = DateTimeUtils.dateNow();
        if (!input.context.Body.partyGeneralData) { input.context.Body.partyGeneralData = {}; }
        input.context.Body.partyGeneralData.documentsValidationDate = currentDate;

        this.view.setClean();
        this.view.validate();
        this.view.reevaluateRules();

    }

    if (isCoach && !isCurrentUserAdmin) {
        this.view.disableAllElements();
        this.view.getContext().AvailableOperations = this.view.getContext().AvailableOperations.filter(
            operation => operation.Code != 'Save'
        );
        this.view.rebind();
    }

    if (duplicateMasterNumber) {
        this.view.disableAllElements();
    }

    if (isSaved && isPartyEditorAGENT) {
        const partyCode = input.context?.Code;
        const contracts = await checkParty(partyCode, ambientProperties);
        const isContractParticipant = contracts.data.filter(item => item.resultData.stateCode !== policyState.Cancelled).length > 0;

        if (isContractParticipant) {
            this.view.disableAllElements();
        }
    }
};
