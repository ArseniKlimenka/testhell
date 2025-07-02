
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
        {condition: productCode == "WCENOAS" && riskCode == "DLP46204", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DLP46204"}},
        {condition: productCode == "WCENOAS" && riskCode == "DLPVV46204", outputs: {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["DLPVV46204", "DDTP46204"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DLPVV46204"}},
        {condition: productCode == "WCENOAS" && riskCode == "DDTP46204", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DDTP46204"}},
        {condition: productCode == "WCENOAS" && riskCode == "DLP46204M", outputs: {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["DLP46204M", "DDTP46204"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DLP46204M"}},
        {condition: productCode == "WCENOAS" && riskCode == "I46204", outputs: {isFixed: true, maxValue: 100000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "I46204"}},
        {condition: productCode == "WCEN3OAS" && riskCode == "DLP46204", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DLP46204"}},
        {condition: productCode == "WCEN3OAS" && riskCode == "DLPVV46204", outputs: {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["DLPVV46204", "DDTP46204"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DLPVV46204"}},
        {condition: productCode == "WCEN3OAS" && riskCode == "DDTP46204", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DDTP46204"}},
        {condition: productCode == "WCEN3OAS" && riskCode == "DLP46204M", outputs: {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["DLP46204M", "DDTP46204"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DLP46204M"}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
