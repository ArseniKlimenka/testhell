'use strict';

const { executionStatuses, errorCodes, getCalcResult, getCommissionItems, setCaclResult } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
     * @desc Used in before save on quotes/policies to calc commission rates
     * @param {object} input input form quotes/policies before save function
     * @param {object} ambientProperties ambientProperties
     */
async function calculateCommissionOnSave(input, ambientProperties) {

    const agentAgreementId = input.context.Body.commission?.agentAgreement?.id;
    const risks = input.context.Body.risks ?? [];
    const productCode = input.context.Body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const paymentFrequencyCode = input.context.Body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const currencyCode = input.context.Body.basicConditions?.currency?.currencyCode;
    const insuranceTerms = input.context.Body.basicConditions?.insuranceTerms;
    const insuranceTermsMonths = input.context.Body.basicConditions?.insuranceTermsMonths;
    const insuranceTermsDays = input.context.Body.basicConditions?.insuranceTermsDays?.value;
    const contractNumber = input.rootContext.Number;
    const isSpecialOffer = input.context?.Body?.basicConditions?.isSpecialOffer;
    const policyCommissionItems = input.context.Body?.commission?.policyCommissionItems;
    const EBMGVTB = [lifeInsuranceConstants.product.EBMGVTB].includes(productCode);

    if (!agentAgreementId || risks.length === 0 || !productCode || !paymentFrequencyCode || (!insuranceTerms && !insuranceTermsMonths && !insuranceTermsDays) || !contractNumber || !currencyCode) {

        return;
    }

    const serviceResponse = await executeCalculationService(input, ambientProperties);
    if (!serviceResponse) {

        return;
    }

    if (!isSpecialOffer && !policyCommissionItems.some(el => el.isChanged == true) && EBMGVTB) {

        policyCommissionItems.forEach(el => el.manualRate = undefined);
    }
    const existingCommItems = input.context.Body.commission?.policyCommissionItems ?? [];

    setCaclResult(existingCommItems,
        serviceResponse.commissionItems,
        serviceResponse.calculationResult.data.amendmentNumber,
        input.context.Body,
        serviceResponse.calculationResult.data.budgetRule,
        serviceResponse.calculationResult.data.budgetRuleAlgorithm,
        isSpecialOffer);

    if (serviceResponse.message) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName
                .toUpperCase() + serviceResponse.message, 'OK', 'OK', 2);
    }
}

async function executeCalculationService(input, ambientProperties) {

    if (ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy' &&
        (!input.context.Body.policyTerms.startDate ||
            !input.context.Body.policyTerms.endDate ||
            !input.context.Body.commission.agentAgreement.id)) {

        return null;
    }

    const calcResult = await getCalcResult(input, ambientProperties);
    let responseMessage = undefined;

    if (!calcResult?.data) {

        responseMessage = '.NoResponseFromServer';

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName
                .toUpperCase() + responseMessage, 'OK', 'OK', 2);

        return;
    }

    if (calcResult.data.status !== executionStatuses.Completed) {

        if (calcResult.data.errorCode === errorCodes.NotSingleResult) {

            responseMessage = '.MoreThanOneResultFound';
        }
        else if (calcResult.data.status === undefined) {

            responseMessage = '.UnknownCalculationError';
        }
    }

    const commItems = getCommissionItems(calcResult.data, input.context.Body);

    return {
        calculationResult: calcResult,
        commissionItems: commItems,
        message: responseMessage
    };
}

module.exports = {
    calculateCommissionOnSave,
    executeCalculationService
};
