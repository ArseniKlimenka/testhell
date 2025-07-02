
module.exports = function resultMapping(input) {

    const output = {};

    output.cnacellationNumber = input.CANCELLATION_NUMBER;
    output.configurationName = input.CONF_CODE_NAME;

    return output;
};
