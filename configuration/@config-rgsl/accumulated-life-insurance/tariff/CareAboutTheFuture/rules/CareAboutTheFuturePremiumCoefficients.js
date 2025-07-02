
/* eslint-disable */
/**
 * Premium configuration
 *
 * @param  {object} input Expected input properties: productCode, issueDate, paymentFrequency, contractTerm
 */
module.exports = function premiumCoefficients(input) {
// destructure input
    const {productCode, issueDate, paymentFrequency, contractTerm} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2024-11-06") && paymentFrequency == 2 && contractTerm == "5", outputs: {E36404: 0.9578, DLPVV36404: 0.015, D36404: 0.0043, DA36404: 0.0043, DLPDPE36404: 0.0229}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2024-11-06") && paymentFrequency == 2 && contractTerm == "6", outputs: {E36404: 0.9474, DLPVV36404: 0.0183, D36404: 0.0057, DA36404: 0.0057, DLPDPE36404: 0.0286}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2024-11-06") && paymentFrequency == 2 && contractTerm == "7", outputs: {E36404: 0.9362, DLPVV36404: 0.0219, D36404: 0.0072, DA36404: 0.0072, DLPDPE36404: 0.0347}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2024-11-06") && paymentFrequency == 2 && contractTerm == "8", outputs: {E36404: 0.9245, DLPVV36404: 0.0255, D36404: 0.0088, DA36404: 0.0088, DLPDPE36404: 0.0412}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2024-11-06") && paymentFrequency == 2 && contractTerm == "9", outputs: {E36404: 0.9122, DLPVV36404: 0.0291, D36404: 0.0104, DA36404: 0.0104, DLPDPE36404: 0.0483}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2024-11-06") && paymentFrequency == 2 && contractTerm == "10", outputs: {E36404: 0.8989, DLPVV36404: 0.0331, D36404: 0.0121, DA36404: 0.0121, DLPDPE36404: 0.0559}},
        {condition: ["ECATFZENIT", "ECATFUBRR"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "5", outputs: {E36404: 0.9578, DLPVV36404: 0.015, D36404: 0.0043, DA36404: 0.0043, DLPDPE36404: 0.0229}},
        {condition: ["ECATFZENIT", "ECATFUBRR"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "6", outputs: {E36404: 0.9474, DLPVV36404: 0.0183, D36404: 0.0057, DA36404: 0.0057, DLPDPE36404: 0.0286}},
        {condition: ["ECATFZENIT", "ECATFUBRR"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "7", outputs: {E36404: 0.9362, DLPVV36404: 0.0219, D36404: 0.0072, DA36404: 0.0072, DLPDPE36404: 0.0347}},
        {condition: ["ECATFZENIT", "ECATFUBRR"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "8", outputs: {E36404: 0.9245, DLPVV36404: 0.0255, D36404: 0.0088, DA36404: 0.0088, DLPDPE36404: 0.0412}},
        {condition: ["ECATFZENIT", "ECATFUBRR"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "9", outputs: {E36404: 0.9122, DLPVV36404: 0.0291, D36404: 0.0104, DA36404: 0.0104, DLPDPE36404: 0.0483}},
        {condition: ["ECATFZENIT", "ECATFUBRR"].includes(productCode) && (issueDate >= "2024-01-01" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "10", outputs: {E36404: 0.8989, DLPVV36404: 0.0331, D36404: 0.0121, DA36404: 0.0121, DLPDPE36404: 0.0559}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "5", outputs: {E36404: 0.981, DLPVV36404: 0.0063, D36404: 0.0016, DA36404: 0.0016, DLPDPE36404: 0.0111}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "6", outputs: {E36404: 0.9764, DLPVV36404: 0.0076, D36404: 0.0021, DA36404: 0.0021, DLPDPE36404: 0.0139}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "7", outputs: {E36404: 0.9715, DLPVV36404: 0.009, D36404: 0.0026, DA36404: 0.0026, DLPDPE36404: 0.0169}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "8", outputs: {E36404: 0.9661, DLPVV36404: 0.0105, D36404: 0.0032, DA36404: 0.0032, DLPDPE36404: 0.0202}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "9", outputs: {E36404: 0.96, DLPVV36404: 0.0122, D36404: 0.0039, DA36404: 0.0039, DLPDPE36404: 0.0239}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "10", outputs: {E36404: 0.9535, DLPVV36404: 0.014, D36404: 0.0046, DA36404: 0.0046, DLPDPE36404: 0.0279}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "11", outputs: {E36404: 0.9457, DLPVV36404: 0.0165, D36404: 0.0055, DA36404: 0.0055, DLPDPE36404: 0.0323}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "12", outputs: {E36404: 0.9372, DLPVV36404: 0.0192, D36404: 0.0066, DA36404: 0.0066, DLPDPE36404: 0.037}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "13", outputs: {E36404: 0.928, DLPVV36404: 0.0222, D36404: 0.0077, DA36404: 0.0077, DLPDPE36404: 0.0421}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "14", outputs: {E36404: 0.918, DLPVV36404: 0.0255, D36404: 0.009, DA36404: 0.009, DLPDPE36404: 0.0475}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "15", outputs: {E36404: 0.9071, DLPVV36404: 0.0291, D36404: 0.0105, DA36404: 0.0105, DLPDPE36404: 0.0533}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "16", outputs: {E36404: 0.8956, DLPVV36404: 0.0328, D36404: 0.0121, DA36404: 0.0121, DLPDPE36404: 0.0595}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "17", outputs: {E36404: 0.8831, DLPVV36404: 0.0369, D36404: 0.0138, DA36404: 0.0138, DLPDPE36404: 0.0662}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "18", outputs: {E36404: 0.8695, DLPVV36404: 0.0414, D36404: 0.0157, DA36404: 0.0157, DLPDPE36404: 0.0734}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "19", outputs: {E36404: 0.8547, DLPVV36404: 0.0464, D36404: 0.0178, DA36404: 0.0178, DLPDPE36404: 0.0811}},
        {condition: ["ECATFPVTB", "ECATFVVTB"].includes(productCode) && (issueDate >= "2024-11-07" && issueDate <= "2099-12-31") && paymentFrequency == 2 && contractTerm == "20", outputs: {E36404: 0.8391, DLPVV36404: 0.0515, D36404: 0.0199, DA36404: 0.0199, DLPDPE36404: 0.0895}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
