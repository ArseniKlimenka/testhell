module.exports = function resultMapping(input) {

    const output = {};

    output.riskShortDescription = input.risk_short_description;
    output.riskFullDescription = input.risk_full_description;
    output.isLife = input.is_life;
    output.withoutProduct = false;
    output.riskOrder = input.risk_order;
    output.riskProgram = input.risk_program;
    output.riskPerson = input.risk_person;
    output.conditionsFunction = input.conditions_function;
    output.risksGroup = input.risks_group;

    return output;

};


