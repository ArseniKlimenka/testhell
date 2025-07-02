'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} partyIsRequired
 * @errorCode {errorCode} orgUnitIsRequired
 */

module.exports = function validateEmployee(input) {

    const validationErrors = [];

    const partyCode = getValue(input, 'employeeParty.partyData.partyCode');
    const orgUnitCode = getValue(input, 'orgUnitCode');

    if (!partyCode) {
        validationErrors.push({
            errorCode: "partyIsRequired",
            errorDataPath: '/employeeParty/partyData/partyFullName'
        });
    }

    if (!orgUnitCode) {
        validationErrors.push({
            errorCode: "orgUnitIsRequired",
            errorDataPath: '/orgUnitName'
        });
    }

    return validationErrors;

};
