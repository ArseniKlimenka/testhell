module.exports = function resultMapping(input) {

    const dimensions = JSON.parse(input.DIMENSIONS);

    const contractType = dimensions.find(x => x.Key == 'contractType');
    const amendmentType = dimensions.find(x => x.Key == 'amendmentType');

    return {
        contractId: input.CONTRACT_ID,
        contractNumber: input.CONTRACT_NUMBER,
        configurationName: input.CONFIGURATION_NAME,
        stateCode: input.STATE_CODE,
        contractType: contractType?.Value,
        amendmentType: amendmentType?.Value
    };
};
