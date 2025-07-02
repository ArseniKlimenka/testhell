'use strict';

const commonBodyMappingHelper = require('@config-rgsl/party/lib/partyCommonBodyMappingHelper');

module.exports = function mapping(input) {

    const commonBody = {};
    commonBodyMappingHelper.mapCommonBody(commonBody, input);
    commonBodyMappingHelper.mapCommonBodySPAndNP(commonBody, input);

    commonBody.dateOfBirth = input.partyPersonData?.dateOfBirth;
    commonBody.lastName = input.partyPersonData?.lastName;
    commonBody.firstName = input.partyPersonData?.firstName;
    commonBody.middleName = input.partyPersonData?.middleName;
    commonBody.fullName = 'ИП ' + commonBody.lastName + ' ' + commonBody.firstName + ' ' + commonBody.middleName;
    commonBody.OGRNOGRNIP = input.partyOrganisationData.OGRNOGRNIP;

    return commonBody;

};
