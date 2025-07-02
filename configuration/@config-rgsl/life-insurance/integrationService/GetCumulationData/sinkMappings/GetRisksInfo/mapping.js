'use strict';

module.exports = function mapInput(input, sinkExchange) {

    let riskCodes = input.risks.map(r => r.risk.riskCode) ?? [];
    riskCodes.push(...sinkExchange.contractsRiskCodes);
    riskCodes = [...new Set(riskCodes)];

    return {
        input: {
            data: {
                criteria: {
                    riskCodes
                }
            }
        }
    };
};
