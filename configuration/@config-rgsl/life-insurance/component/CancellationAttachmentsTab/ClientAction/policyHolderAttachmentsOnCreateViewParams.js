'use strict';

module.exports = function policyHolderAttachmentsOnCreateViewParams(input, ambientProperties) {

    const partyCode = input.context.Body.technicalData?.policyParties?.holder?.personCode;
    return { 'master-entity-code': partyCode };
};
