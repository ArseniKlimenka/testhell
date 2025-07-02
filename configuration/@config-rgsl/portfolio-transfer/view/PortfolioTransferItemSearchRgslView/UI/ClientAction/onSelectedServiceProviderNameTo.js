'use strict';

module.exports = async function onSelectedServiceProviderNameTo(input) {

    const selectedItems = input.getLookupSelection();

    input.data.request.data.criteria.serviceProviderNameTo = selectedItems[0].resultData.partyDisplayName;
    input.data.request.data.criteria.serviceProviderCodeTo = selectedItems[0].resultData.serviceProviderCode;
};
