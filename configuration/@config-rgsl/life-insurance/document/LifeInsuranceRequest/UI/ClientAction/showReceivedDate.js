'use strict';

const { documentActors } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showReceivedDate(input, ambientProperties) {

    const isNotAgent = input?.context?.WorkUnitActor?.CurrentActor != documentActors.Agent;

    return isNotAgent;

};
