'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = `${input.SUBGROUP_CODE_LEVEL_1 ?? ''} ${input.SUBGROUP_CODE_LEVEL_2 ?? ''} ${input.SUBGROUP_CODE_LEVEL_3 ?? ''} ${input.SUBGROUP_CODE_LEVEL_4 ?? ''}`;
    output.description = input.INJURY_GROUP;

    return output;
};
