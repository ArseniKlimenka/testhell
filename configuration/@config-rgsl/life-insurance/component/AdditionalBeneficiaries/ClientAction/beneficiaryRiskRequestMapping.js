'use strict';
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function beneficiaryRiskRequestMapping(input) {

    const policyRisks = input.rootContext.Body.risks ?? [];
    const policyRisksCodes = policyRisks.map(item => item.risk.riskCode);

    return {
        data: {
            criteria: {
                riskCodes: policyRisksCodes,
                selectBeneficiariesRisksOnly: true
            }
        }
    };
};
