'use strict';

/**
 * @errorCode {errorCode} Draft_to_Active_NeedReview
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const body = input.body;
    const uwTriggers = body?.uwTriggers ?? [];

    if (uwTriggers.length > 0) {

        validationErrors.push({
            errorCode: "Draft_to_Active_NeedReview"
        });
    }

    return validationErrors;
};
