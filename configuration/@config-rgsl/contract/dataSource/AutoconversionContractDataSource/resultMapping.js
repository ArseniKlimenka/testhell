module.exports = function resultMapping(input) {

    return {
        executedOn: input.EXECUTED_ON,
        contractNumber: input.CONTRACT_NUMBER,
        errorMessage: input.ERROR_MESSAGE,
        errorCode: input.ERROR_CODE,
        errorMessageDescription: input.ERROR_MESSAGE_DESCRIPTION,
        contractConfigurationName: input.ARTIFACT_CODE_NAME
    };
};
