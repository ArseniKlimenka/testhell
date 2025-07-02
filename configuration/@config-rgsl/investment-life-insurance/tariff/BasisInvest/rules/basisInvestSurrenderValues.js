
/* eslint-disable */
/**
 * Surrender Values
 *
 * @param  {object} input Expected input properties: productCode, contractTerm
 */
module.exports = function surrenderValues(input) {
// destructure input
    const {productCode, contractTerm} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: ["IBI3BFKO", "IBI3OAS", "IBI3BFKO17", "IBI3ZENIT17"].includes(productCode) && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBI5BFKO", "IBI5OAS", "IBI5BFKO17", "IBI5ZENIT17"].includes(productCode) && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBI3" && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBI5" && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBI10" && contractTerm == "10", outputs: {1: 0.54, 2: 0.57, 3: 0.6, 4: 0.63, 5: 0.67, 6: 0.71, 7: 0.75, 8: 0.8, 9: 0.85, 10: 0.9}},
        {condition: productCode == "IBIP3" && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBIP5" && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBIP10" && contractTerm == "10", outputs: {1: 0.54, 2: 0.57, 3: 0.6, 4: 0.63, 5: 0.67, 6: 0.71, 7: 0.75, 8: 0.8, 9: 0.85, 10: 0.9}},
        {condition: productCode == "IBI3AKCEPT" && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBI5AKCEPT" && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBI2ZENIT" && contractTerm == "2", outputs: {1: 0.76, 2: 0.84, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBI3ZENIT" && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: productCode == "IBI5ZENIT" && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBA3", "IBA3SMP"].includes(productCode) && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBA5", "IBA5SMP"].includes(productCode) && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBA3BFKO", "IBA3REINVEST"].includes(productCode) && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBA5BFKO", "IBA5REINVEST"].includes(productCode) && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBAP3", "IBAP3VTB", "IBAV3VTB", "IBA2P3", "IBA2P3VTB", "IBA2V3VTB"].includes(productCode) && contractTerm == "3", outputs: {1: 0.56, 2: 0.67, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBAP5", "IBAP5VTB", "IBAV5VTB", "IBA2V5VTB", "IBA2P5VTB"].includes(productCode) && contractTerm == "5", outputs: {1: 0.44, 2: 0.5, 3: 0.59, 4: 0.69, 5: 0.8, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}},
        {condition: ["IBAKVP5VTB", "IBAKVV5VTB", "IBAKVP5PEVTB", "IBAKVV5PEVTB"].includes(productCode) && contractTerm == "5", outputs: {1: 0.75, 2: 0.8, 3: 0.85, 4: 0.9, 5: 0.95, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
