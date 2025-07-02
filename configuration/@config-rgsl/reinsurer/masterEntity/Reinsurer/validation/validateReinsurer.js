'use strict';

/**
 * @errorCode {errorCode} reinsurerCodeIsRequired
 * @errorCode {errorCode} partyIsRequired
 * @errorCode {errorCode} reinsurerTypeIsRequired
 */

module.exports = function validateReinsurer(input) {

    const validationErrors = [];

    const partyCode = input.partyCode;
    const reinsurerCode = input.reinsurerCode;
    const reinsurerType = input.reinsurerType;

    if (!partyCode) {
        validationErrors.push({
            errorCode: "partyIsRequired",
            errorDataPath: '/Body/partyDisplayName'
        });
    }

    if (!reinsurerCode) {
        validationErrors.push({
            errorCode: "reinsurerCodeIsRequired",
            errorDataPath: '/Body/reinsurerCode'
        });
    }

    if (!reinsurerType) {
        validationErrors.push({
            errorCode: "reinsurerTypeIsRequired",
            errorDataPath: '/Body/reinsurerType'
        });
    }

    return validationErrors;

};
