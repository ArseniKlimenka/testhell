
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
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "E36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "DLPVV36404", outputs: {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPVV36404", "CD5C36404", "SOA36404", "DLPW36404", "D36404", "DA36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "CD5C36404", outputs: {isFixed: false, maxValue: 1000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "SOA36404", outputs: {isFixed: false, maxValue: 750000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "DLPW36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPVV36404", "CD5C36404", "SOA36404"], premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "D36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPVV36404", "CD5C36404", "SOA36404"], premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "DA36404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPVV36404", "CD5C36404", "SOA36404"], premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "CD636404", outputs: {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPVV36404", "CD5C36404", "SOA36404"], premiumCalcRisk: "E36404"}},
        {condition: ["CAPCLCHILDOAS", "CAPCLCHILDBOXOAS"].includes(productCode) && riskCode == "IH36404", outputs: {isFixed: false, maxValue: 750000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "IH36404"}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
