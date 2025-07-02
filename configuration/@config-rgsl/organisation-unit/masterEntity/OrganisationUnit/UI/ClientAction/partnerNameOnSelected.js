'use strict';

module.exports = function partnerNameOnSelected(input) {

    input.context.Body.partnerName = input.getLookupSelection()[0].resultData.partyDisplayName;
    input.context.Body.partnerCode = input.getLookupSelection()[0].resultData.serviceProviderCode;

    input.context.Body.parentName = undefined;
    input.context.Body.parentCode = undefined;
    input.context.ParentId = undefined;

};
