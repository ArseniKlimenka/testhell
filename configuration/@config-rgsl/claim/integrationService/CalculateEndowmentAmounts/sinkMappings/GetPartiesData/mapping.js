'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    const policyHolderCode = input.body.technicalData.policyInfo.policyHolder.code;
    const beneficiaries = input.body.endowmentBeneficiaries ?? [];
    let partyCodes = beneficiaries.map(item => item.partyCode);
    partyCodes.push(policyHolderCode);
    partyCodes = [...new Set(partyCodes)];

    if (partyCodes?.length === 0) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    partyCodes: partyCodes,
                }
            }
        }
    };
};
