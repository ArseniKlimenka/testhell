module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        configurationName: input.CONFIGURATION_NAME,
        deadLineDate: input.DEADLINE_DATE
    };
};
