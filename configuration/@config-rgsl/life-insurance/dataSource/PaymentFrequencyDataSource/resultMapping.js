module.exports = function resultMapping(input) {

    const output = {};

    output.paymentFrequencyCode = input.CODE;
    output.paymentFrequencyDescription = input.DESCRIPTION;

    return output;

};
