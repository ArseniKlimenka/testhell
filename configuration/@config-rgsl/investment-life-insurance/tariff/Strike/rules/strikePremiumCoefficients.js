
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
        {condition: ["ISO", "ISP"].includes(productCode) && contractTerm == "5", outputs: {IE36904: 0, IDLPDP36904: 0.014, IDLPVV36904: 0.014, IDNSVV36904: 0.0063, IDNSSS36904: 0.0063}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
