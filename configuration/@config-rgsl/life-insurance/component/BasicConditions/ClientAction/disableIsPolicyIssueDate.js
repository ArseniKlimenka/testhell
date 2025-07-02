'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function disableIsPolicyIssueDate(input, ambientProperties) {

    const stateCode = input?.context?.State?.Code;
    const contractType = input?.context?.Dimensions?.contractType;

    if (!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled() || shouldDisableSaveableContract(input, this.view)) {

        return true;
    }

    const hasNumber = input?.context?.Number;
    const isCollectivePolicy = input.context.ConfigurationCodeName == 'CollectiveLifeInsurancePolicy';
    if (hasNumber && isCollectivePolicy) {

        return true;
    }

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const body = input.context.Body;
    const property = input.dataProperty;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const salesSegment = body?.mainInsuranceConditions?.insuranceProduct?.salesSegment;
    const issueDate = input.componentContext.issueDate;
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isSpecificSales = userRoles.some(item => ['SpecificSales'].includes(item.ApplicationRoleCodeName));

    if (isSpecificSales) {

        return false; // for testing
    }

    if (currentWorkUnitActor == 'Underwriter' && stateCode == lifeInsuranceConstants.quoteState.OnReview) {

        return false;
    }

    if (!productCode) {

        return true;
    }

    if (!issueDate || ['mass', 'creditBFKOAuto'].includes(salesSegment)) {

        const currentDate = DateTimeUtils.newDateAsString();
        const draftState = lifeInsuranceConstants.quoteState.Draft;
        const quoteType = lifeInsuranceConstants.contractType.Quote;

        if (stateCode === draftState && contractType === quoteType && input.data[property] !== currentDate) {

            input.data[property] = DateTimeUtils.newDateAsString();
            this.view.save();
        }

        return true;
    }

    return true;
};
