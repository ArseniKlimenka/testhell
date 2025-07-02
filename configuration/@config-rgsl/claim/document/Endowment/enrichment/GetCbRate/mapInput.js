'use strict';

module.exports = function mapping(input) {

    const startDate = input.technicalData?.policyInfo?.startDate;
    const endDate = input.technicalData?.policyInfo?.endDate;

    if (!startDate || !endDate) {

        return;
    }

    return {
        data: {
            criteria: {
                dateFrom: startDate,
                dateTo: endDate
            }
        }
    };
};

