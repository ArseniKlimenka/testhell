module.exports = function mapping(input) {

    if (!input.contractNumber || !input.contractConfigurationName) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    number: input.contractNumber,
                    configurationName: input.contractConfigurationName
                }
            }
        }
    };

};
