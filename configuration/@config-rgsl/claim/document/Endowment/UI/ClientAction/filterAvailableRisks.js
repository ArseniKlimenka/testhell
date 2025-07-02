'use strict';

module.exports = function filterAvailableRisks(input) {

    const initialItems = input.items;
    const risksInfo = input.rootContext.ClientViewModel.risksInfo;
    const selectedRisk = input.rootContext.Body.mainAttributes.selectedRisk;

    if (!risksInfo) {

        return initialItems;
    }

    if (risksInfo.length === 0) {

        return [];
    }

    const filteredItems = initialItems.filter(i => {

        const riskInfo = risksInfo.find(r => r.riskCode === i.riskCode);
        return riskInfo?.riskGroup === 'Endowment';
    });

    if (selectedRisk) {

        const currentRisk = filteredItems.find(i => i.riskCode === selectedRisk.riskCode);

        if (!currentRisk) {

            input.rootContext.Body.mainAttributes.selectedRisk = undefined;
        }
    }

    return filteredItems;
};
