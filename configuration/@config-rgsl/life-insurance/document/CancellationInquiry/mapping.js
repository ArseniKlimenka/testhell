module.exports = function mapping(input) {

    return {
        cancellationNumber: input.cancellationNumber,
        holder: input.holder,
        contractNumber: input.contractNumber,
        contractConfigurationCodeName: input.contractConfigurationCodeName,
        configurationCodeName: input.configurationCodeName,
    };

};
