
module.exports = function resultMapping(input) {

    const output = {};

    output.username = input.USERNAME;
    output.numbers = JSON.parse(input.AGENT_AGREEMENT_NUMBERS);

    return output;
};
