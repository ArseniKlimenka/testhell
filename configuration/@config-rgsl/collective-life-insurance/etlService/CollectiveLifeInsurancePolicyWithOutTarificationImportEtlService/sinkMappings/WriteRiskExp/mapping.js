'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, sinkExchange) {

    const risks = [];
    const insuredId = sinkExchange.insuredId;
    const contractNumber = this.businessContext.etlServiceInput.contractNumber;
    for (let riskNumber = 1; riskNumber < 24; riskNumber++) {

        const risk = createRisk(riskNumber, input);
        if (risk.riskCode || risk.reinsPremium || risk.reinsRate) {

            risk.insuredId = insuredId;
            risk.contractNumber = contractNumber;

            risks.push(risk);
        }
    }

    const output = {
        request: {
            risks
        }
    };

    return output;
};

function createRisk(riskNumber, input) {

    const risk = {};

    risk.riskCode = getValue(input, `data.insuranceAmountRiskCode${riskNumber}`);
    risk.reinsPremium = getValue(input, `data.reinsurancePremium${riskNumber}`);
    risk.reinsRate = getValue(input, `data.reinsuranceRate${riskNumber}`);

    return risk;
}
