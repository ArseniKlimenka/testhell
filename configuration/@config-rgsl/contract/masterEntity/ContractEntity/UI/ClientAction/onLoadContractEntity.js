'use strict';

const { reloadContractEntityOnUpdate } = require('@config-rgsl/life-insurance/lib/serverSideEventHelper');
const { rolesAllowedToEditContractAdditionalParameters } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = async function onLoadContractEntity(input, ambientProperties) {

    const currentActor = input.context?.WorkUnitActor?.CurrentActor;
    const isAllowToEditRoles = rolesAllowedToEditContractAdditionalParameters.includes(currentActor);

    if (!isAllowToEditRoles) {
        this.view.disableAllElements();
    }

    reloadContractEntityOnUpdate(this);
    this.view.collapseSideContent();
};
