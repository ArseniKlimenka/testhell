'use strict';

module.exports = function resultMapping(input) {

    const output = {};
    output.subgroupLevel1 = {};
    output.subgroupLevel2 = {};
    output.subgroupLevel3 = {};

    output.code = input.CODE;
    output.description = input.DESCRIPTION;
    output.group = input.INJURY_GROUP;
    output.subgroupLevel1.code = input.SUBGROUP_CODE_LEVEL_1;
    output.subgroupLevel1.description = input.SUBGROUP_DESCRIPTION_LEVEL_1;
    output.subgroupLevel2.code = input.SUBGROUP_CODE_LEVEL_2;
    output.subgroupLevel2.description = input.SUBGROUP_DESCRIPTION_LEVEL_2;
    output.subgroupLevel3.code = input.SUBGROUP_CODE_LEVEL_3;
    output.subgroupLevel3.description = input.SUBGROUP_DESCRIPTION_LEVEL_3;
    output.paymentPercentage = input.INSURANCE_SUM_RATE;
    output.note = input.NOTE;
    output.fullTextResult = `${input.CODE} ${input.DESCRIPTION}`;

    return output;
};
