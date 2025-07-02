'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const entityId = this.businessContext.entityId;

    const output = {
        data: {
            criteria: {
                partyId: entityId,
            }
        }
    };

    return output;
};
