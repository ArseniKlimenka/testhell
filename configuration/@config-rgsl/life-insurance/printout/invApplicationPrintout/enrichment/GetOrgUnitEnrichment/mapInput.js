'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                organisationUnitCode: input.initiator.organisationUnitCode,
            }
        }
    };

    return output;

};
