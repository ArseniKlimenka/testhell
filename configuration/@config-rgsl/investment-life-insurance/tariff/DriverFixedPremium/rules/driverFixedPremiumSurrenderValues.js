
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
        {condition: contractTerm == "5", outputs: {1: 0.69, 2: 0.74, 3: 0.8, 4: 0.86, 5: 0.92}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
