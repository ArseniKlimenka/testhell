module.exports = function resultMapping(input) {

    const output = {};

    output.amount = input[0]?.AMOUNT ?? 0;

    return output;
};
