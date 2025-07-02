
module.exports = function resultMapping(input) {

    const output = {};

    output.number = input.number;
    output.serviceCode = input.service_code;

    return output;
};
