'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.body;
    const startDate = body.policyTerms.startDate;
    const endDate = body.policyTerms.endDate;

    const risks = [];
    const insuredId = sinkExchange.insuredId;
    const contractNumber = this.businessContext.etlServiceInput.contractNumber;
    for (let riskNumber = 1; riskNumber < 24; riskNumber++) {

        const risk = createRisk(riskNumber, input);
        if (risk.riskCode || risk.premium || risk.amount) {

            risk.insuredId = insuredId;
            risk.contractNumber = contractNumber;
            risk.startDate = startDate;
            risk.endDate = endDate;

            risks.push(risk);
        }
    }

    if (!sinkExchange.globalContext.risks) {
        sinkExchange.globalContext.risks = [];
    }
    sinkExchange.globalContext.risks.push(...risks);

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
    risk.premium = getValue(input, `data.insurancePremium${riskNumber}`);
    risk.amount = getValue(input, `data.insuranceAmount${riskNumber}`);

    return risk;
}
