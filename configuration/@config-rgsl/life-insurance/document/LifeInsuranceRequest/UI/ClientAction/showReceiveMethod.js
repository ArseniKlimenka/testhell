'use strict';

const { documentActors } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showReceiveMethod(input, ambientProperties) {

    const isGeneralBackOffice = input.rootContext.WorkUnitActor.CurrentActor == documentActors.GeneralBackOffice;
    const isOperations = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Operations;

    return isGeneralBackOffice || isOperations;

};
