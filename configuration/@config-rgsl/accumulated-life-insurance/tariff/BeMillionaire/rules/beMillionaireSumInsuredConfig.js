
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
        {condition: ["EBMBFKO", "EBMZENIT", "EBMAKCEPT", "EBMOAS", "EBMAKBARS"].includes(productCode) && riskCode == "E36404", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMBFKO", "EBMZENIT", "EBMAKCEPT", "EBMOAS", "EBMAKBARS"].includes(productCode) && riskCode == "DLP36404", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMBFKO", "EBMZENIT", "EBMAKCEPT", "EBMOAS", "EBMAKBARS"].includes(productCode) && riskCode == "DLPVV6536404", outputs: {useCashBack: true, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMBFKO", "EBMZENIT", "EBMAKCEPT", "EBMOAS", "EBMAKBARS"].includes(productCode) && riskCode == "DLPVV7036404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMBFKO", "EBMZENIT", "EBMAKCEPT", "EBMOAS", "EBMAKBARS"].includes(productCode) && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMGBFKO", "EBMGMINBANK", "EBMOAS2", "EBMG", "EBMGP", "EBMGSMP", "EBMGREINVEST", "EBMGZENIT", "EBMOPTIMAOAS2", "EBMGVTB", "EBMGBESTVTB", "EBMGRETVTB", "EBMMGREINVEST", "EBMGRETVTB", "EBMGLIFEINVEST", "EBMGPB", "EBMGNRETVTB", "EBMGNVTB", "EBMGUBRR"].includes(productCode) && riskCode == "E36404", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMGBFKO", "EBMGMINBANK", "EBMOAS2", "EBMG", "EBMGP", "EBMGSMP", "EBMGREINVEST", "EBMGZENIT", "EBMOPTIMAOAS2", "EBMGVTB", "EBMGBESTVTB", "EBMGRETVTB", "EBMGLIFEINVEST", "EBMGPB", "EBMGNRETVTB", "EBMGNVTB", "EBMGUBRR"].includes(productCode) && riskCode == "DLPVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMGBFKO", "EBMGMINBANK", "EBMOAS2", "EBMG", "EBMGP", "EBMGSMP", "EBMGREINVEST", "EBMOPTIMAOAS2", "EBMGLIFEINVEST", "EBMGZENIT", "EBMGUBRR"].includes(productCode) && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:10000000, 71:1000000}, fixedValue: undefined}},
        {condition: ["EBMGVTB", "EBMGBESTVTB"].includes(productCode) && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:15000000, 71:5000000}, fixedValue: undefined}},
        {condition: ["EBMGVVTB", "EBMGVNVTB"].includes(productCode) && riskCode == "E36404", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMGVVTB", "EBMGVNVTB"].includes(productCode) && riskCode == "DLPVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMGVVTB", "EBMGVNVTB"].includes(productCode) && riskCode == "DNS36404", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:1000000000, 71:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBMIBFKO" && riskCode == "IE36904", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBMIBFKO" && riskCode == "IDLPVV36904", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBMIBFKO" && riskCode == "IDNSVV36904", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:10000000, 71:1000000}, fixedValue: undefined}},
        {condition: productCode == "EBMPYBFKO" && riskCode == "E36404", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBMPYBFKO" && riskCode == "DLPVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBMPYBFKO" && riskCode == "CDHR10800", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: 12000000}},
        {condition: productCode == "EBMPFBFKO" && riskCode == "E36404", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBMPFBFKO" && riskCode == "DLP36404", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBMPFBFKO" && riskCode == "DASI20700", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:1000000}, fixedValue: undefined}},
        {condition: productCode == "EBMPFBFKO" && riskCode == "ISI20700", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:1000000}, fixedValue: undefined}},
        {condition: ["EBMGRETVTB", "EBMGPB"].includes(productCode) && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:15000000}, fixedValue: undefined}},
        {condition: productCode == "EBMMGREINVEST" && riskCode == "DLPVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:10000000}, fixedValue: undefined}},
        {condition: productCode == "EBMMGREINVEST" && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:2000000, 71:1000000}, fixedValue: undefined}},
        {condition: ["EBMGN", "EBMGNT"].includes(productCode) && riskCode == "E36404", outputs: {useCashBack: true, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMGN", "EBMGNT"].includes(productCode) && riskCode == "DLPVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: ["EBMGN", "EBMGNT"].includes(productCode) && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:5000000, 71:1000000}, fixedValue: undefined}},
        {condition: ["EBMGNRETVTB", "EBMGNVTB"].includes(productCode) && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:3000000}, fixedValue: undefined}},
        {condition: productCode == "EBM3GUBRR" && riskCode == "E36404", outputs: {useCashBack: false, isReturn: false, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBM3GUBRR" && riskCode == "ME36404", outputs: {useCashBack: true, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBM3GUBRR" && riskCode == "DLPVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:1000000000}, fixedValue: undefined}},
        {condition: productCode == "EBM3GUBRR" && riskCode == "DNSVV36404", outputs: {useCashBack: false, isReturn: true, maxValueConfig: {18:15000000}, fixedValue: undefined}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
