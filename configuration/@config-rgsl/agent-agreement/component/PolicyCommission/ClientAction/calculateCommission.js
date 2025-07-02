'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { executeCalculationService } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');
const { setCaclResult } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @translationKey {translationKey} NoResponseFromServer
 * @translationKey {translationKey} MoreThanOneResultFound
 * @translationKey {translationKey} NoResult
 * @translationKey {translationKey} UnknownCalculationError
 */
module.exports = async function calculateCommission(input, ambientProperties) {
    if (input.componentContext && input.context.Dimensions.amendmentType === changeAmendmentTypes.portfolioMovement) {
        input.rootContext.Body.oldCommission = deepCopy(input.componentContext);
    }

    const risks = input.rootContext.Body.risks ?? [];

    if (risks.length === 0) {

        return;
    }

    const serviceResponse = await executeCalculationService(input, ambientProperties);

    if (!serviceResponse) {

        return;
    }

    const existingCommItems = getValue(input, 'componentContext.policyCommissionItems', []);

    setCaclResult(existingCommItems,
        serviceResponse.commissionItems,
        serviceResponse.calculationResult.data.amendmentNumber,
        input.rootContext.Body,
        serviceResponse.calculationResult.data.budgetRule,
        serviceResponse.calculationResult.data.budgetRuleAlgorithm);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

    if (serviceResponse.message) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName
                .toUpperCase() + serviceResponse.message, 'OK', 'OK', 2);
    }
};


