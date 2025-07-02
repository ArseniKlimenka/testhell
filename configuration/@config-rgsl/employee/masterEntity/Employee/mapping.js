'use strict';

module.exports = function mapping(input) {

    const commonBody = {};

    commonBody.partyId = input.employeeParty.partyData.partyId;
    commonBody.partyCode = input.employeeParty.partyData.partyCode;

    commonBody.attributes = {
        partyDisplayName: input.employeeParty.partyData.partyFullName,
        businessCode: input.tabNumber,
        visibilityType: input.visibilityType,
        orgUnitName: input.orgUnitName,
        orgUnitCode: input.orgUnitCode,
        isPersonalManager: input.isPersonalManager,
        sadNumber: input.sadNumber
    };

    return commonBody;

};
