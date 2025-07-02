'use strict';

const {
    typeOfRequest,
    initiator
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showChangeReason(input, ambientProperties) {

    const requestModification = input.context.Body.typeOfRequest == typeOfRequest.Modification;
    const requestInitiator = input.context.Body.initiator == initiator.insurer;

    return requestModification && requestInitiator;

};
