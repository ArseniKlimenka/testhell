
/* eslint-disable */
/**
 * Additional services configuration
 *
 * @param  {object} input Expected input properties: contractTerm
 */
module.exports = function surrenderValues(input) {
// destructure input
    const {contractTerm} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: contractTerm == "2", outputs: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}},
        {condition: contractTerm == "3", outputs: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}},
        {condition: contractTerm == "1", outputs: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
