module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.group = null;
    output.parameters.subgroupDescriptionLevel1 = null;
    output.parameters.subgroupDescriptionLevel2 = null;
    output.parameters.ruleCode = null;

    if (input.data.criteria.ruleCode) {

        output.parameters.ruleCode = input.data.criteria.ruleCode;
    }

    if (input.data.criteria.subgroupCodeLevel1) {

        output.parameters.subgroupCodeLevel1 = input.data.criteria.subgroupCodeLevel1;
    }

    if (input.data.criteria.subgroupDescriptionLevel2) {

        output.parameters.subgroupDescriptionLevel2 = `%${input.data.criteria.subgroupDescriptionLevel2}%`;
    }

    if (input.data.criteria.group) {

        output.parameters.group = input.data.criteria.group;
    }

    return output;
};
