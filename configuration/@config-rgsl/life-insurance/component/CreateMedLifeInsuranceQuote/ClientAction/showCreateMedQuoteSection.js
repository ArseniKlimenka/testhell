'use strict';

const { productCode, product, policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function showCreateMedQuoteSection(input, ambientProperties) {

    const isActive = input?.context?.State.Code == policyState.Active;
    const isAgentOrOperations = [actor.Agent, actor.Operations].includes(input?.context?.WorkUnitActor?.CurrentActor);
    const isAccumulatedLifeInsurancePolicy = ambientProperties?.configurationCodeName == productCode.AccumulatedLifeInsurancePolicy;
    const isMedLifeInsurancePolicy = ambientProperties?.configurationCodeName == productCode.MedLifeInsurancePolicy;
    const currentPolicyInStates = [policyState.Active];

    let currentProductInList;
    if (isAccumulatedLifeInsurancePolicy) {
        currentProductInList = [product.CAPCLCHILDOAS, product.CAPCLCHILDBOXOAS, product.CAPCLRELOAS, product.CAPCLRELBOXOAS];
    }
    if (isMedLifeInsurancePolicy) {
        currentProductInList = [product.GENCHKSPORT];
    }

    const showMedQuoteSectionByDate = input.context.ClientViewModel.showMedQuoteSectionByDate;
    const currentProductCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    if (isAgentOrOperations && isActive && showMedQuoteSectionByDate &&
            currentProductInList.includes(currentProductCode) &&
            currentPolicyInStates.includes(input.rootContext.State.Code)
            && DateTimeUtils.isBefore(DateTimeUtils.formatDate(input?.context?.Body?.basicConditions?.issueDate), DateTimeUtils.formatDate('2025-02-07'))) {
        return true;
    }
    return false;

};
