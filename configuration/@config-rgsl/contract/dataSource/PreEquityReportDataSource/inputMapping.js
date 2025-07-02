'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    const preEquityReportDate = criteria?.preEquityReportDate;
    const changeTypes = criteria?.changeTypes;

    if (!preEquityReportDate || !changeTypes?.length) {

        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria
        }
    };

    return output;
};
