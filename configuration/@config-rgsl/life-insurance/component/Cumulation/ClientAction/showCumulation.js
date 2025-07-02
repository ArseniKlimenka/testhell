'use strict';

const { isShowCumulationTriggers } = require('@config-rgsl/life-insurance/lib/cumulationHelper');
const { documentActors } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showCumulation(input, ambientProperties) {

    const isActorAgent = ambientProperties.currentWorkUnitActor == documentActors.Agent;

    return !isActorAgent && isShowCumulationTriggers(input.context.Body);

};
