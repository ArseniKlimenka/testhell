module.exports = function mapping(input, sinkExchange) {

    const oldBodyRisks = sinkExchange.body.risks;
    oldBodyRisks.forEach(oldBodyRisk => {
        const newRisk = sinkExchange.calculatedBody.risks.find(x => x.risk.riskCode == oldBodyRisk.risk.riskCode);
        oldBodyRisk.riskInsuredSumByPeriod = newRisk.riskInsuredSumByPeriod;
        oldBodyRisk.riskInsuredSum = newRisk.riskInsuredSum;
    });

    const oldCommonBodyRisks = sinkExchange.commonBody.items[0].attributes.risks;
    oldCommonBodyRisks.forEach(oldCommonBodyRisk => {
        const newRisk = sinkExchange.calculatedBody.risks.find(x => x.risk.riskCode == oldCommonBodyRisk.risk.riskCode);
        oldCommonBodyRisk.riskInsuredSumByPeriod = newRisk.riskInsuredSumByPeriod;
        oldCommonBodyRisk.riskInsuredSum = newRisk.riskInsuredSum;
    });

    return {
        request: {
            contractNumber: input.data.contractNumber,
            bodyRisks: JSON.stringify(oldBodyRisks),
            commonBodyRisks: JSON.stringify(oldCommonBodyRisks)
        }
    };

};
