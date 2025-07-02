"use strict";

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    const activeStates = [
        claimStates.claimDiretorApproval,
        claimStates.draft,
        claimStates.claimManagerApproval,
        claimStates.legalApproval,
        claimStates.methodologyDirectorApproval,
        claimStates.partiallyPaid,
        claimStates.paid,
        claimStates.requestToClient];

    const activeClaims = dataSource.data.filter(claim => activeStates.includes(claim.resultData.documentStateCode));

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    if (activeClaims.length > 0) {

        input.tempTechnicalData.hasActiveClaims = true;
    }
};
