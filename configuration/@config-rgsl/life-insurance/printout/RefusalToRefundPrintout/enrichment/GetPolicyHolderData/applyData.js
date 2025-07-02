'use strict';

const defaultText = '';

module.exports = function mapping(input, dataSourceResponse) {

    input.partyAddressFactualValue = defaultText;

    if (dataSourceResponse?.data?.length === 0) {

        return;
    }

    const party = dataSourceResponse.data[0].resultData;
    input.sellerUsername = this.applicationContext.originatingUser.username;
    if (party.body.partyAddresses && party.body.partyAddresses.length > 0) {
        const partyAddresses = party.body.partyAddresses;
        const partyAddressFactual = partyAddresses.filter(address => address.addressType.addressTypeCode == 'F');
        input.partyAddressFactualValue = partyAddressFactual[0].fullAddress.value;
        input.partyAddressFactualPostalCode = partyAddressFactual[0].postalCode;
    }
};
