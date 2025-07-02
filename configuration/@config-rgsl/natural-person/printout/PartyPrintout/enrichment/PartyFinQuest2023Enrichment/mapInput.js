'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const entityCode = this.businessContext.entityCode;

    const output = {
        data: {
            criteria: {
                partyCode: entityCode,
                finKnowledgeQuestionnaire2024: false,
                finKnowledgeQuestionnaire2023: true,
            }
        }
    };

    return output;
};
