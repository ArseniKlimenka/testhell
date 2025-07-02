"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }


    const risks = input.mainAttributes.availableRisks || [];

    risks.forEach(risk => {

        const riskData = dataSource.data.find(data => data.resultData.riskCode === risk.riskCode);

        if (riskData) {

            risk.businessLine = riskData.resultData.businessLine;
            risk.risksGroup = riskData.resultData.risksGroup;
        }
    });
};
