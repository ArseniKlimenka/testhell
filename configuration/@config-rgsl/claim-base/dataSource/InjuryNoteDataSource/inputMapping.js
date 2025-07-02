module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.group = null;
    output.parameters.subgroupCodeLevel1 = null;
    output.parameters.subgroupCodeLevel2 = null;
    output.parameters.subgroupCodeLevel3 = null;
    output.parameters.description = null;
    output.parameters.ruleCode = null;

    if (input.data.criteria.ruleCode) {

        output.parameters.ruleCode = input.data.criteria.ruleCode;
    }

    if (input.data.criteria.group) {

        output.parameters.group = input.data.criteria.group;
    }

    if (input.data.criteria.subgroupCodeLevel1) {

        output.parameters.subgroupCodeLevel1 = input.data.criteria.subgroupCodeLevel1;
    }

    if (input.data.criteria.subgroupCodeLevel2) {

        output.parameters.subgroupCodeLevel2 = input.data.criteria.subgroupCodeLevel2;
    }

    if (input.data.criteria.subgroupCodeLevel3) {

        output.parameters.subgroupCodeLevel3 = input.data.criteria.subgroupCodeLevel3;
    }

    if (input.data.criteria.description) {

        output.parameters.description = input.data.criteria.description;
    }

    if (input.data.criteria.note) {

        output.parameters.note = input.data.criteria.note;
    }

    return output;
};
