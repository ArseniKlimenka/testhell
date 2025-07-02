'use strict';

const { documentActors } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showContractAdditionalParametersTab(input, ambientProperties) {

    const currentActor = input.context?.WorkUnitActor?.CurrentActor;
    const isAllowToShow = [documentActors.GeneralBackOffice, documentActors.Operations].includes(currentActor);

    return isAllowToShow;
};
