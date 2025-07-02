module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.group = null;
    output.parameters.subgroupDescriptionLevel1 = null;

    if (input.data.criteria.subgroupDescriptionLevel1) {

        output.parameters.subgroupDescriptionLevel1 = `%${input.data.criteria.subgroupDescriptionLevel1}%`;
    }

    if (input.data.criteria.group) {

        output.parameters.group = input.data.criteria.group;
    }

    if (input.data.criteria.ruleCode) {

        output.parameters.ruleCode = input.data.criteria.ruleCode;
    }

    return output;
};
