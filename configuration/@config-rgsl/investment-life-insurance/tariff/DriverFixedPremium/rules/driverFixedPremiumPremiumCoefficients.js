
/* eslint-disable */
/**
 * Additional services configuration
 *
 * @param  {object} input Expected input properties: productCode, contractTerm
 */
module.exports = function premiumCoefficients(input) {
// destructure input
    const {productCode, contractTerm} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "IDFP" && contractTerm == "5", outputs: {DLPDP36904: 0.014, DLP36904: 0.014, DNS36904: 0.0063, E36904: 0}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
