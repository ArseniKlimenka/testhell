
/* eslint-disable */
/**
 * Premium Coefficients
 *
 * @param  {object} input Expected input properties: productCode, contractTerm, insuredAge
 */
module.exports = function premiumCoefficients(input) {
// destructure input
    const {productCode, contractTerm, insuredAge} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "PREEQUITYVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.99, DLP36914: 0.0092, DNS36414: 0.0008}},
        {condition: productCode == "PREEQUITYPVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.99, DLP36914: 0.0092, DNS36414: 0.0008}},
        {condition: productCode == "PREEQUITYOAS" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.99, DLP36914: 0.0092, DNS36414: 0.0008}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
