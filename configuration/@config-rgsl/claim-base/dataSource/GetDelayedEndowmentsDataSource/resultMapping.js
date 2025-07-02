
module.exports = function resultMapping(input) {

    const output = {};

    output.endowmentNumber = input.ENDOWMENT_NUMBER;
    output.configurationName = input.CONF_CODE_NAME;

    return output;
};
