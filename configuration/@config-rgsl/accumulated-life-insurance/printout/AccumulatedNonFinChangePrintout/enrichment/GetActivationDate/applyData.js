"use strict";

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const activatedState = dataSourceResponse.data.find(s => s.resultData.stateCode === "Activated");

        if (activatedState) {

            input.activatedStateDate = DateTimeUtils.formatDate(activatedState.resultData.validFrom, DateTimeUtils.DateFormats.CALENDAR);
        }
        else {

            input.activatedStateDate = "";
        }
    }
};
