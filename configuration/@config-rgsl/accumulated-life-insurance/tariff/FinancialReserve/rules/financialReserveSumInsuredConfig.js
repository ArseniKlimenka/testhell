
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
        {condition: productCode == "EFRBFKO" && riskCode == "E36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "DLPSS36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "DVV36404", outputs: {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "DAVV36404", outputs: {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "DNS36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "DTP36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "CTDA36404", outputs: {isFixed: false, maxValue: 1200000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CTDA36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "DASS36404", outputs: {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "CDVV36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPSS36404", "DVV36404", "DAVV36404"], premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "CDP36404", outputs: {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "CDHR10800", outputs: {isFixed: true, maxValue: 12000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: productCode == "EFRBFKO" && riskCode == "CDHW10800", outputs: {isFixed: true, maxValue: 16600000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
