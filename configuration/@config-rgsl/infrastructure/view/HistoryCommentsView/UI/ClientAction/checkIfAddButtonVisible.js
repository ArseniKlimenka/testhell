const { actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function checkIfAddButtonVisible(input, ambientProperties) {

    const currentWorkUnitActor = input.rootContext.WorkUnitActor?.CurrentActor;

    return currentWorkUnitActor === actor.Operations;
};
