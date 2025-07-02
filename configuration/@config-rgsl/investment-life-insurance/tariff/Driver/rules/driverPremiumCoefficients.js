
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
        {condition: ["IDC5", "IDC", "IDCP3", "IDCP5", "IDCP", "IDC3"].includes(productCode) && contractTerm == "3", outputs: {DLPDP36904: 0.0077, DLP36904: 0.0077, DNS36904: 0.0036, E36904: 0}},
        {condition: ["IDC5", "IDC", "IDCP3", "IDCP5", "IDCP", "IDC3"].includes(productCode) && contractTerm == "5", outputs: {DLPDP36904: 0.014, DLP36904: 0.014, DNS36904: 0.0063, E36904: 0}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
