'use strict';

module.exports = function mapping(input) {

    const contractNumber = input.mainAttributes.contract?.number ?? "Empty";
    const riskCode = input.mainAttributes?.selectedRisk?.riskCode ?? "Empty";

    return {
        data: {
            criteria: {
                contractNumber: contractNumber,
                riskCode: riskCode
            }
        }
    };
};
