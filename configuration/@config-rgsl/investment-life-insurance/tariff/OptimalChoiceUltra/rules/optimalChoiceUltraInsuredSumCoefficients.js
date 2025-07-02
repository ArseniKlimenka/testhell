
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
        {condition: productCode == "IOCPVTB" && contractTerm == "1" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCVVTB" && contractTerm == "1" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCPVTB" && contractTerm == "2" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCVVTB" && contractTerm == "2" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCPVTB" && contractTerm == "3" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCVVTB" && contractTerm == "3" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCPVTB" && contractTerm == "4" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCVVTB" && contractTerm == "4" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCPVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}},
        {condition: productCode == "IOCVVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.001, DLP36914: 0.001, DNS36414: 0.1, DNS36414MAX: 200000000}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
