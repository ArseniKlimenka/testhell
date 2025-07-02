'use strict';

const partyUtils = require('@config-rgsl/life-insurance/lib/partyUtils');

module.exports = async function refreshBeneficiaryOwners(input, ambientProperties) {

    const anotherNaturalPersons = input.componentContext.anotherNaturalPersons;
    const anotherNaturalPersonCodes = anotherNaturalPersons?.map(item => item.anotherNaturalPerson?.partyCode);

    if (anotherNaturalPersonCodes?.length == 0) {
        return;
    }

    const parties = await partyUtils.getPartiesData(ambientProperties, this, anotherNaturalPersonCodes);

    if (parties?.data?.length == 0) {
        return;
    }

    partyUtils.mapPartiesToBeneficiaryOwners(anotherNaturalPersons, parties);

    this.view.rebind();
    this.view.validate();
};
