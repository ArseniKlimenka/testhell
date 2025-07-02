module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        state: input.STATE,
        configurationName: input.CODE_NAME,
        isPolicy: input.IS_POLICY == 1
    };
};
