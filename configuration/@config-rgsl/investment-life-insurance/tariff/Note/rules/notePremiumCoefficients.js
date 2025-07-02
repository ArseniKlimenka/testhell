
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
        {condition: ["NOTEV2BFKO", "NOTE2BFKO"].includes(productCode) && contractTerm == "2", outputs: {DLPDP36904: 0, DLP36904: 0.0091, DNS36404: 0.0003, E36904: 0}},
        {condition: productCode == "NOTE3BFKO" && contractTerm == "3", outputs: {DLPDP36904: 0, DLP36904: 0.014, DNS36404: 0.0004, E36904: 0}},
        {condition: productCode == "NOTEV3BFKO" && contractTerm == "3", outputs: {DLPDP36904: 0, DLP36904: 0.0051, DNS36404: 0.004, E36904: 0}},
        {condition: productCode == "NOTE1BFKO" && contractTerm == "1", outputs: {DLPDP36904: 0, DLP36904: 0.004, DNS36404: 0.001, E36904: 0}},
        {condition: ["NOTE1BFKO3", "NOTE1BFKO4"].includes(productCode) && contractTerm == "1", outputs: {DLPDP36904: 0, DLP36904: 0.004, DNS36404: 0.001, E36904: 0}},
        {condition: productCode == "NOTEV1BFKO" && contractTerm == "1", outputs: {DLPDP36904: 0, DLP36904: 0.004, DNS36404: 0.001, E36904: 0}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
