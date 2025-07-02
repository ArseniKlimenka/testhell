
/* eslint-disable */
/**
 * Additional services configuration
 *
 * @param  {object} input Expected input properties: paymentFrequency
 */
module.exports = function surrenderValues(input) {
// destructure input
    const {paymentFrequency} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: paymentFrequency == "1", outputs: {1: 0.65, 2: 0.6825000000000001, 3: 0.7166250000000002, 4: 0.7524562500000003, 5: 0.7900790625000004, 6: 0.8295830156250005, 7: 0.8710621664062506}},
        {condition: ["2", "3"].includes(paymentFrequency), outputs: {1: 0, 2: 0, 3: 0.256, 4: 0.413, 5: 0.605, 6: 0.794, 7: 0.8710621664062506}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
