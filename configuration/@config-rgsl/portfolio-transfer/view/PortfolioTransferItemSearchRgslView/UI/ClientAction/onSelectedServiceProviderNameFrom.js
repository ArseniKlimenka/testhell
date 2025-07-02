'use strict';

module.exports = async function onSelectedServiceProviderNameFrom(input) {

    const selectedItems = input.getLookupSelection();

    input.data.request.data.criteria.serviceProviderNameFrom = selectedItems[0].resultData.partyDisplayName;
    input.data.request.data.criteria.serviceProviderCodeFrom = selectedItems[0].resultData.serviceProviderCode;
};
