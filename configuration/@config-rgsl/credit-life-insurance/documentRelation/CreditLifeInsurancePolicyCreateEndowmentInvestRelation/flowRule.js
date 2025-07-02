'use strict';

/**
 * @errorCode {errorCode} OperationsActorsAllowedToCreateEndowmentInvest
 */

const { actorsWithRightsToCreateEndowment } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function rule({ body, commonBody }) {

    const validationErrors = [];

    if (!actorsWithRightsToCreateEndowment.includes(this.applicationContext.actor)) {
        validationErrors.push({
            errorCode: "OperationsActorsAllowedToCreateEndowmentInvest"
        });
    }

    return validationErrors;
};
