const OnTransitionUtils = require('@config-rgsl/contract/lib/OnTransitionUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onTransition(input) {

    const applicationContext = this.applicationContext;
    const user = applicationContext.originatingUser;

    const result = {
        attributes: {
            lastTransitionInfo: {
                executedById: user.id,
                executedBy: user.username,
                executionTime: dateUtils.dateTimeNow(),
                transitionName: input.transitionName
            }
        }
    };

    return result;
};
