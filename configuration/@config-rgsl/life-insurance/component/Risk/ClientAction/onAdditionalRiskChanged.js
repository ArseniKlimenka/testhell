
module.exports = async function onAdditionalRiskChanged(input) {

    input.context.manualRiskProgram = undefined;
    input.context.manualRiskPerson = undefined;
};
