
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
        {condition: productCode == "IOCVVTB" && contractTerm == "1" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9973, DLP36914: 0.0026, DNS36414: 0.0001}},
        {condition: productCode == "IOCPVTB" && contractTerm == "1" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9973, DLP36914: 0.0026, DNS36414: 0.0001}},
        {condition: productCode == "IOCVVTB" && contractTerm == "2" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9939, DLP36914: 0.0058, DNS36414: 0.0003}},
        {condition: productCode == "IOCPVTB" && contractTerm == "2" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9939, DLP36914: 0.0058, DNS36414: 0.0003}},
        {condition: productCode == "IOCVVTB" && contractTerm == "3" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9899, DLP36914: 0.0096, DNS36414: 0.0005}},
        {condition: productCode == "IOCPVTB" && contractTerm == "3" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9899, DLP36914: 0.0096, DNS36414: 0.0005}},
        {condition: productCode == "IOCVVTB" && contractTerm == "4" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9854, DLP36914: 0.0139, DNS36414: 0.0007}},
        {condition: productCode == "IOCPVTB" && contractTerm == "4" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9854, DLP36914: 0.0139, DNS36414: 0.0007}},
        {condition: productCode == "IOCVVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9803, DLP36914: 0.0188, DNS36414: 0.0009}},
        {condition: productCode == "IOCPVTB" && contractTerm == "5" && (insuredAge >= 18 && insuredAge <= 80), outputs: {E36914: 0.9803, DLP36914: 0.0188, DNS36414: 0.0009}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
