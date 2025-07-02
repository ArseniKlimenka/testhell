'use strict';

const { transitionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function rule(input) {

    const transitionName = input.commonBody.transitionResult?.transitionName;
    return transitionName === transitionNames.claimManagerToExternalOrganisation ||
        transitionName === transitionNames.externalOrganisationToClaimManager;
};
