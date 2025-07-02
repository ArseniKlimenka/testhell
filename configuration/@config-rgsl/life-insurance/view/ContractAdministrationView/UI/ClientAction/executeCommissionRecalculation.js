'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function executeCommissionRecalculation(input, ambientProperties) {

    const commissionContractNumber = input.context.Body.commissionContract?.number;
    const aaNumber = input.context.Body?.agentAgreement?.number;

    if (!commissionContractNumber) {

        ambientProperties.services.confirmationDialog.showConfirmation('Укажите все необходимые параметры!', 'OK', 'OK', 2);
        return;
    }

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/RecalculatePolicyCommission/1',
        data: {
            data: {
                contractNumber: commissionContractNumber,
                agentAgreementNumber: aaNumber
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    let message = undefined;
    if (!result?.data?.message) {

        message = 'Комиссия пересчитана для указанного договора.';
    }
    else {

        message = result.data.message;
    }

    ambientProperties.services.confirmationDialog.showConfirmation(message, 'OK', 'OK', 2);
};
