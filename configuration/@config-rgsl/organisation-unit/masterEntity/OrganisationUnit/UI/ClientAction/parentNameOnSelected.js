'use strict';

module.exports = function parentNameOnSelected(input) {

    input.context.Body.parentName = input.getLookupSelection()[0].resultData.name;
    input.context.Body.parentCode = input.getLookupSelection()[0].resultData.code;
    input.context.ParentId = input.getLookupSelection()[0].resultData.id;

    input.context.Body.partnerName = undefined;
    input.context.Body.partnerCode = undefined;

};
