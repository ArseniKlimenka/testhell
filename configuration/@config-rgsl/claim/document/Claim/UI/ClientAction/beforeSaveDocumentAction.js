'use strict';

const { checkIfInsuredEventActive, getPartyBankAccount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { claimStatesToAllocateActivities } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

/**
 * @translationKey {translationKey} InsuredEventCancelled
 */
module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    for (let i = 0; i < input.context.Body.claimBeneficiaries.length; i++) {

        const claimBeneficiary = input.context.Body.claimBeneficiaries[i];

        if (claimBeneficiary.bankAccount) {
            continue;
        }

        input.context.Body.claimBeneficiaries[i].bankAccount = await getPartyBankAccount(claimBeneficiary, ambientProperties, this);
    }

    const insuredEventNumber = input.context.Body.mainAttributes?.insuredEvent?.insuredEventNumber;

    if (insuredEventNumber) {

        const isInsuredEventActive = checkIfInsuredEventActive(insuredEventNumber, ambientProperties);

        if (!isInsuredEventActive) {

            ambientProperties.services.confirmationDialog
                .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.InsuredEventCancelled', 'OK', 'OK', 2);
            return false;
        }
    }

    const entityId = input.context.Id;
    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();
    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    let currentAssignee = undefined;
    const stateCode = input.context.State.Code;

    if (entityId) {

        currentAssignee = await getCurrentAssignee(input, ambientProperties);

        if (claimStatesToAllocateActivities.includes(stateCode) &&
        !isDocumentLocked &&
        (!currentAssignee || currentAssignee !== currentUser)) {

            throw 'Невозможно сохранить документ! На текущего пользователя не назначена задача!';
        }
    }

    delete input.context.Body.tempTechnicalData;
};

async function getCurrentAssignee(input, ambientProperties) {

    const activitiesRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/OpenStateActivityDataSource',
        data: {
            data: {
                criteria: {
                    entityId: input.context.Id,
                    stateCode: input.context.State.Code
                }
            }
        }
    };

    const result = await ambientProperties.services.api.call(activitiesRequest);

    let currentAssignee = undefined;

    if (result?.data?.length > 0) {

        currentAssignee = result.data[0].resultData.userName;
    }

    return currentAssignee;
}
