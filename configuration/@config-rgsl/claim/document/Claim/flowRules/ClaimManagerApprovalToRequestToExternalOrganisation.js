'use strict';

/**
 * @errorCode {errorCode} RequestToExtOrgReasonIsRequired
 */
module.exports = function rule(input) {

    const validationErrors = [];

    const requestToExtOrgReason = input.body.requestReasons?.requestToExtOrgReason;

    if (!requestToExtOrgReason) {

        validationErrors.push({
            errorCode: 'RequestToExtOrgReasonIsRequired',
            errorDataPath: '/Body/requestReasons/requestToExtOrgReason'
        });
    }

    return validationErrors;
};
