const { documentActors } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function isAgent(input, ambientProperties) {
    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;

    return currentWorkUnitActor == documentActors.Agent;
};
