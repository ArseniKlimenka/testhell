'use strict';

/**
 * @errorCode {errorCode} partnerCodeIsRequired
 * @errorCode {errorCode} partyIsRequired
 * @errorCode {errorCode} partnerTypeIsRequired
 */

module.exports = function validatePartner(input) {

    const validationErrors = [];

    const partyCode = input.partyCode;
    const partnerCode = input.partnerCode;
    const partnerType = input.partnerType;

    if (!partyCode) {
        validationErrors.push({
            errorCode: "partyIsRequired",
            errorDataPath: '/Body/partyDisplayName'
        });
    }

    if (!partnerCode) {
        validationErrors.push({
            errorCode: "partnerCodeIsRequired",
            errorDataPath: '/Body/partnerCode'
        });
    }

    if (!partnerType) {
        validationErrors.push({
            errorCode: "partnerTypeIsRequired",
            errorDataPath: '/Body/partnerType'
        });
    }

    return validationErrors;

};
