
/* eslint-disable */
/**
 * sumInsuredConfig
 *
 * @param  {object} input Expected input properties: productCode, riskCode
 */
module.exports = function sumInsuredConfig(input) {
// destructure input
    const {productCode, riskCode} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "EPCLZENIT" && riskCode == "E36404", outputs: {isWOP: false, WOPRisks: undefined}},
        {condition: productCode == "EPCLZENIT" && riskCode == "DLPSS36404", outputs: {isWOP: false, WOPRisks: undefined}},
        {condition: productCode == "EPCLZENIT" && riskCode == "DNS36404", outputs: {isWOP: false, WOPRisks: undefined}},
        {condition: productCode == "EPCLZENIT" && riskCode == "DDTP36404", outputs: {isWOP: false, WOPRisks: undefined}},
        {condition: productCode == "EPCLZENIT" && riskCode == "D36404", outputs: {isWOP: true, WOPRisks: ["E36404", "DLPSS36404"]}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
