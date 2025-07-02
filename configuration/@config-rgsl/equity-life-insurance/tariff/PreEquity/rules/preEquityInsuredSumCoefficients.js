
/* eslint-disable */
/**
 * Insured Sum Coefficients
 *
 * @param  {object} input Expected input properties: productCode, contractTerm, insuredAge
 */
module.exports = function insuredSumCoefficients(input) {
// destructure input
    const {productCode, contractTerm, insuredAge} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "PREEQUITYVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 65), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 20000000}},
        {condition: productCode == "PREEQUITYVTB" && contractTerm == "5" && (insuredAge >= 66 && insuredAge <= 70), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 15000000}},
        {condition: productCode == "PREEQUITYVTB" && contractTerm == "5" && (insuredAge >= 71 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 10000000}},
        {condition: productCode == "PREEQUITYPVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 65), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 20000000}},
        {condition: productCode == "PREEQUITYPVTB" && contractTerm == "5" && (insuredAge >= 66 && insuredAge <= 70), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 15000000}},
        {condition: productCode == "PREEQUITYPVTB" && contractTerm == "5" && (insuredAge >= 71 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 10000000}},
        {condition: productCode == "PREEQUITYOAS" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 65), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 20000000}},
        {condition: productCode == "PREEQUITYOAS" && contractTerm == "5" && (insuredAge >= 66 && insuredAge <= 70), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 15000000}},
        {condition: productCode == "PREEQUITYOAS" && contractTerm == "5" && (insuredAge >= 71 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 10000000}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
