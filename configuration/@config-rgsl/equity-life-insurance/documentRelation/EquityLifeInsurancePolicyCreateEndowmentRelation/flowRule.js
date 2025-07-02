'use strict';

/**
 * @errorCode {errorCode} OperationsActorsAllowedToCreateEndowment
 */

const { actorsWithRightsToCreateEndowment } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function rule({ body, commonBody }) {

    const validationErrors = [];

    if (!actorsWithRightsToCreateEndowment.includes(this.applicationContext.actor)) {
        validationErrors.push({
            errorCode: "OperationsActorsAllowedToCreateEndowment"
        });
    }

    return validationErrors;
};
