"use strict";

module.exports = function mapping(input, dataSource) {

    if ((dataSource?.data?.length ?? 0) === 0) {

        return;
    }

    if (!input.technicalData) {

        input.technicalData = {};
    }

    const cbRateInfo = dataSource.data.map(item => {

        return {
            cbRateDate: item.resultData.cbRateDate,
            cbRate: item.resultData.cbRate
        };
    });

    input.technicalData.cbRateInfo = cbRateInfo;
};

