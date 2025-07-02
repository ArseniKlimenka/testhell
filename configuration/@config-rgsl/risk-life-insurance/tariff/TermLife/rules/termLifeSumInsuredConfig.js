
/* eslint-disable */
/**
 * sumInsuredConfig
 *
 * @param  {object} input Expected input properties: productCode, riskCode
 */
module.exports = function sumInsuredConfig(input) {
// destructure input
    const {productCode, riskCode} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "TERMVVTB" && riskCode == "DLP42204", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:10500000,66:5000000}, fixedValue: undefined}},
        {condition: productCode == "TERMVVTB" && riskCode == "D42204", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:10500000}, fixedValue: undefined}},
        {condition: productCode == "TERMVVTB" && riskCode == "DNS42204", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:10500000}, fixedValue: undefined}},
        {condition: productCode == "TERMVVTB" && riskCode == "DTP42204", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:10500000}, fixedValue: undefined}},
        {condition: productCode == "TERMVVTB" && riskCode == "I42204", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:7000000,66:5000000}, fixedValue: undefined}},
        {condition: productCode == "TERMVVTB" && riskCode == "CDHR10800", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:60000000}, fixedValue: 60000000}},
        {condition: productCode == "TERMVVTB" && riskCode == "CDHW10800", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:60000000}, fixedValue: 60000000}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
