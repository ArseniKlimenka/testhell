
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
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "E36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "DLP36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "D36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLP36404"], premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "DA36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLP36404"], premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "MJL36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "DNS36404", outputs: {isFixed: false, maxValue: 1800000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DNS36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "DDTP36404", outputs: {isFixed: false, maxValue: 1800000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DDTP36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "DSS36404", outputs: {isFixed: false, maxValue: 3000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DSS36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "CD36404", outputs: {isFixed: false, maxValue: 3000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CD36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "CD636404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLP36404"], premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "HI36404", outputs: {isFixed: false, maxValue: 1800000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "HI36404"}},
        {condition: ["CAPCLRELOAS", "CAPCLRELBOXOAS"].includes(productCode) && riskCode == "IH36404", outputs: {isFixed: false, maxValue: 1800000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "IH36404"}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
