
/* eslint-disable */
/**
 * Surrender Values configuration
 *
 * @param  {object} input Expected input properties: contractTerm, paymentFrequency
 */
module.exports = function surrenderValues(input) {
// destructure input
    const {contractTerm, paymentFrequency} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: contractTerm == 5 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.375917869929282, 4: 0.611166227925626, 5: 0.9, 6: 0, 7: 0}},
        {condition: contractTerm == 7 && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.245412607787954, 4: 0.403705015872139, 5: 0.597673592779379, 6: 0.787680120095691, 7: 0.95}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
