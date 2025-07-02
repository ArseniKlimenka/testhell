const OnTransitionUtils = require('@config-rgsl/contract/lib/OnTransitionUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onTransition(input) {

    const applicationContext = this.applicationContext;
    const user = applicationContext.originatingUser;

    let result = {
        attributes: {
            lastTransitionInfo: {
                executedById: user.id,
                executedBy: user.username,
                executionTime: dateUtils.dateTimeNow(),
                transitionName: input.transitionName
            }
        }
    };
    const productGroup = input.documentConfiguration.dimensions.productGroup;

    if (productGroup == lifeInsuranceConstants.productGroup.NSZ.descriptionRU) {
        result = OnTransitionUtils.onTransitionAccumulatedLifeInsurance(input, this, result);
    }
    if (productGroup == lifeInsuranceConstants.productGroup.ISZ.descriptionRU) {
        // for now the same functions
        result = OnTransitionUtils.onTransitionAccumulatedLifeInsurance(input, this, result);
    }
    if (productGroup == lifeInsuranceConstants.productGroup.CSZ.descriptionRU) {
        // for now the same functions
        result = OnTransitionUtils.onTransitionCreditLifeInsurance(input, this, result);
    }
    if (productGroup == lifeInsuranceConstants.productGroup.DMS.descriptionRU) {
        // for now the same functions
        result = OnTransitionUtils.onTransitionAccumulatedLifeInsurance(input, this, result);
    }
    if (productGroup == lifeInsuranceConstants.productGroup.RISK.descriptionRU) {
        // for now the same functions
        result = OnTransitionUtils.onTransitionAccumulatedLifeInsurance(input, this, result);
    }
    if (productGroup == lifeInsuranceConstants.productGroup.DSZ.descriptionRU) {
        // for now the same functions
        result = OnTransitionUtils.onTransitionAccumulatedLifeInsurance(input, this, result);
    }
    if (productGroup == lifeInsuranceConstants.productGroup.NS.descriptionRU) {
        // for now the same functions
        result = OnTransitionUtils.onTransitionAccumulatedLifeInsurance(input, this, result);
    }

    return result;

};
