'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const states = [
        'ClaimManagerApproval',
        'RequestToClient',
        'RequestToExternalOrganisation',
        'SecurityApproval',
        'LegalApproval',
        'ClaimDirectorApproval',
        'MethodologyDirectorApproval'
    ];

    const data = getValue(sinkResult, 'data', []);

    const intersection = data.filter(x => states.includes(x.resultData.claimState));
    if (intersection.length > 0) {
        sinkExchange.canCreateCancellation = false;
        sinkExchange.hasClaims = true;
    }
};
