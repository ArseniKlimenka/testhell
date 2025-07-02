
/* eslint-disable */
/**
 * Surrender Values
 *
 * @param  {object} input Expected input properties: contractTerm, paymentFrequency
 */
module.exports = function surrenderValues(input) {
// destructure input
    const {contractTerm, paymentFrequency} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: contractTerm == "5" && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.39, 4: 0.62, 5: 0.9, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0}},
        {condition: contractTerm == "7" && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.26, 4: 0.415, 5: 0.605, 6: 0.79, 7: 0.95, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0}},
        {condition: contractTerm == "10" && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.168, 4: 0.27, 5: 0.395, 6: 0.515, 7: 0.62, 8: 0.725, 9: 0.835, 10: 0.95, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0}},
        {condition: contractTerm == "15" && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.095, 4: 0.155, 5: 0.23, 6: 0.305, 7: 0.365, 8: 0.43, 9: 0.5, 10: 0.565, 11: 0.64, 12: 0.71, 13: 0.79, 14: 0.865, 15: 0.95}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
