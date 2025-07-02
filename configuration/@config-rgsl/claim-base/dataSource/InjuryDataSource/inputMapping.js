module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.group = null;
    output.parameters.subgroupLevel1 = null;
    output.parameters.subgroupLevel2 = null;
    output.parameters.subgroupLevel3 = null;
    output.parameters.description = null;
    output.parameters.ruleCode = null;
    output.parameters.note = null;
    output.parameters.insuranceRule = null;

    if (input.data.criteria.insuranceRule) {

        output.parameters.insuranceRule = input.data.criteria.insuranceRule?.code;
    }

    if (input.data.criteria.group) {

        output.parameters.group = input.data.criteria.group?.description;
    }

    if (input.data.criteria.subgroupLevel1) {

        output.parameters.subgroupLevel1 = input.data.criteria.subgroupLevel1?.code;
    }

    if (input.data.criteria.subgroupLevel2) {

        output.parameters.subgroupLevel2 = input.data.criteria.subgroupLevel2?.code;
    }

    if (input.data.criteria.subgroupLevel3) {

        output.parameters.subgroupLevel3 = input.data.criteria.subgroupLevel3?.code;
    }

    if (input.data.criteria.description) {

        output.parameters.description = `%${input.data.criteria.description?.description ?? ''}%`;
    }

    if (input.data.criteria.note) {

        output.parameters.note = input.data.criteria.note?.description;
    }

    return output;
};
