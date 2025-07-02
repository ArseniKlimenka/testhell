module.exports = function resultMapping(input) {

    return {
        contractNo: input.CONTRACT_NUMBER,
        configurationName: input.CONFIGURATION_CODE_NAME,
        configurationVersion: input.CONFIGURATION_VERSION
    };
};
