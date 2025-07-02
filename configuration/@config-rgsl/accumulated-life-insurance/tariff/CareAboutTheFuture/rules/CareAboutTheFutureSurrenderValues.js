
/* eslint-disable */
/**
 * Surrender values configuration
 *
 * @param  {object} input Expected input properties: contractTerm, paymentFrequency
 */
module.exports = function surrenderValues(input) {
// destructure input
    const {contractTerm, paymentFrequency} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: contractTerm == 5 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.7, 4: 0.8, 5: 0.9, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 6 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.6, 4: 0.7, 5: 0.8, 6: 0.9, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 7 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.5, 4: 0.6, 5: 0.7, 6: 0.8, 7: 0.9, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 8 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.4, 4: 0.5, 5: 0.6, 6: 0.7, 7: 0.8, 8: 0.9, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 9 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.3, 4: 0.4, 5: 0.5, 6: 0.6, 7: 0.7, 8: 0.8, 9: 0.9, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 10 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.2, 4: 0.3, 5: 0.4, 6: 0.5, 7: 0.6, 8: 0.7, 9: 0.8, 10: 0.9, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 11 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 12 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 13 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 14 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 1, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 15 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 1, 15: 1, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 16 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 0, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 17 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 0, 19: 0, 20: 0}},
        {condition: contractTerm == 18 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 0, 20: 0}},
        {condition: contractTerm == 19 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 0}},
        {condition: contractTerm == 20 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.1, 4: 0.2, 5: 0.3, 6: 0.4, 7: 0.5, 8: 0.6, 9: 0.7, 10: 0.8, 11: 0.9, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
