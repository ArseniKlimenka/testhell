'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const entityCode = this.businessContext.entityCode;

    const output = {
        data: {
            criteria: {
                deduplNumber: entityCode,
                isProcessed: "1",
                selectUniquePartyCodes: true
            }
        }
    };

    return output;
};
