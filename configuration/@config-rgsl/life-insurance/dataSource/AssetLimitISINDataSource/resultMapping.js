module.exports = function resultMapping(input) {

    const output = {};

    output.isin = input[0]?.ISIN;

    return output;
};
