'use strict';

const { insuredEventReasons,
    endowmentStatesWithoutInvestmentProfitsRecalculate,
    endowmentStatesToAllocateActivities } = require('@config-rgsl/claim-base/lib/claimConsts');
const uriBuilder = require('@config-rgsl/infrastructure/lib/UriBuilder');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    await this.view.evaluate(['/selectedClaimRisks[GetClaimSelectedRisks]'], false, true);

    const entityId = input.context.Id;
    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();
    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    let currentAssignee = undefined;
    const currentActor = ambientProperties.currentWorkUnitActor;
    const stateCode = input.context.State.Code;

    if (entityId) {

        currentAssignee = await getCurrentAssignee(input, ambientProperties);
    }

    if (endowmentStatesToAllocateActivities.includes(stateCode) &&
        !isDocumentLocked && currentActor !== 'Accounting' &&
        (!currentAssignee || currentAssignee !== currentUser)) {

        throw 'Невозможно сохранить документ! На текущего пользователя не назначена задача!';
    }

    this.view.startBlockingUI();

    const contractNumber = input.context.Body.mainAttributes?.contract?.number ?? 'NONE';
    const endowmentReason = input.context.Body.mainAttributes?.eventReason?.code;

    const endowmentRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/EndowmentSearchDataSource',
        data: {
            data: {
                criteria: {
                    contractNumber: contractNumber,
                    onlyNotCancelled: true,
                    eventReason: insuredEventReasons.contractEnd.code
                }
            }
        }
    };

    if (endowmentReason === insuredEventReasons.contractEnd.code) {

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(endowmentRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        let existingEndowments = undefined;

        if (result?.data && result.data.length > 0) {

            let numbers = result.data.map(item => {

                return item.metadata.code;
            });

            numbers = numbers.filter(i => i !== input.context.Number);

            numbers = numbers.map(n => `<a href="${uriBuilder.getEndowmentUri(n)}">${n}</a>`);
            existingEndowments = numbers.join();
        }

        if (existingEndowments) {

            const saveErrorMessage = 'Не возможно сохранить документ. Найдены другие документы с причиной \'Окончание срока действия договора\':';
            ambientProperties.services.confirmationDialog
                .showConfirmation(`${saveErrorMessage} ${existingEndowments}`, 'OK', 'OK', 2);
            this.view.stopBlockingUI();
            return false;
        }
    }

    await this.view.evaluate(['[GetEndowmentAttachmentsPackageEnrichment]'], true, true);
    await this.view.evaluate(['[GetPolicyPaymentInfo]'], false, true);

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
