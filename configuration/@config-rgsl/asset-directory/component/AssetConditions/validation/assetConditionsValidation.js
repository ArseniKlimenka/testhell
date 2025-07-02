'use strict';

/**
 * @errorCode {errorCode} documentShouldHaveAtleastOneCondition
 */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    if (!input.assetConditions || input.assetConditions.length === 0) {

        validationErrors.push({
            errorCode: "documentShouldHaveAtleastOneCondition"
        });
    }

    return validationErrors;
};
