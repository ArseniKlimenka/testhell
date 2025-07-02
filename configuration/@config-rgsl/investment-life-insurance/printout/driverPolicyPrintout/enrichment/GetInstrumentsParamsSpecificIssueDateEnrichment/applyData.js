'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const resultData = dataSourceResponse.data[0].resultData;

        const basicInvestPurchaseDate = resultData.purchaseDate;
        const basicInvestDischargeDate = resultData.dischargeDate;

        input.purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
        input.dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);
        input.couponPeriods = resultData.couponPeriods ?? [];
    }

};
