'use strict';

const { actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideSectionForAgent(input) {

    const isAgent = input.context.WorkUnitActor.CurrentActor == actor.Agent;

    return isAgent;
};
