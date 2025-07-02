module.exports = function resultMapping(input) {

    const output = {};
    output.selectedRisk = {};

    output.selectedRisk.riskCode = input.riskCode;
    output.selectedRisk.riskShortDescription = input.riskShortDescription;
    output.selectedRisk.risksGroup = input.risksGroup;
    output.selectedRisk.businessLine = input.businessLine;

    return output;

};
