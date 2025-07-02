module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        stateId: input.STATE_ID,
        configurationName: input.CONF_CODE_NAME
    };
};
