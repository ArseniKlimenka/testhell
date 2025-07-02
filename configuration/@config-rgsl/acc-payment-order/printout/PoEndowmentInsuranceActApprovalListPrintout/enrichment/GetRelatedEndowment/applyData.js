'use strict';

const { endowmentEventType, investmentEventType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const endowmentRecord = dataSourceResponse.data[0].resultData;
        input.insuranceMethodologyConclusion = endowmentRecord.approvalConclusions.insuranceMethodologyConclusion;
        input.actuaryConclusion = endowmentRecord.approvalConclusions.actuaryConclusion;
        input.legalConclusion = endowmentRecord.approvalConclusions.legalConclusion;
        input.securityConclusion = endowmentRecord.approvalConclusions.securityConclusion;
        input.complianceConclusion = endowmentRecord.approvalConclusions.complianceConclusion;

        if (endowmentRecord.eventType.code === endowmentEventType.code) {

            input.docName = 'Дожитие';
        }
        else if (endowmentRecord.eventType.code === investmentEventType.code) {

            input.docName = 'ДИД';
        }
    }
};

