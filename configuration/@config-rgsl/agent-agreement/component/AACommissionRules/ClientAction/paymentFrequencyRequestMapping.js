'use strict';

module.exports = function paymentFrequencyRequestMapping(input) {

    const selectedPremiumPeriodType = input.data?.commissionRules?.premiumPeriodType?.value;
    const searchCriteria = {};

    if (selectedPremiumPeriodType && selectedPremiumPeriodType.code) {

        searchCriteria.code = selectedPremiumPeriodType.code;
    }
    else if (input.searchText) {

        searchCriteria.description = input.searchText;
    }

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
