
/* eslint-disable */
/**
 * surrenderValues
 *
 * @param  {object} input Expected input properties: productCode, contractTerm, paymentFrequency
 */
module.exports = function surrenderValues(input) {
// destructure input
    const {productCode, contractTerm, paymentFrequency} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: ["EBMBFKO", "EBMOAS"].includes(productCode) && contractTerm == "5" && paymentFrequency == "2", outputs: {1: 0, 2: 0.6, 3: 0.7, 4: 0.8, 5: 0.9}},
        {condition: ["EBMZENIT", "EBMAKCEPT", "EBMAKBARS", "EBMPYBFKO", "EBMPFBFKO", "EBMGMINBANK", "EBMOAS2", "EBMG", "EBMGP", "EBMGSMP", "EBMGZENIT", "EBMOPTIMAOAS2", "EBMGREINVEST", "EBMMGREINVEST", "EBMGLIFEINVEST", "EBMGPB", "EBMGN", "EBMGNT", "EBMGUBRR"].includes(productCode) && contractTerm == "5" && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.7, 4: 0.8, 5: 0.9}},
        {condition: ["EBMIBFKO", "EBMGBFKO", "EBMGVTB", "EBMGVVTB", "EBMGBESTVTB", "EBMGRETVTB", "EBMGNRETVTB", "EBMGNVTB", "EBMGVNVTB"].includes(productCode) && contractTerm == "5" && paymentFrequency == "2", outputs: {1: 0, 2: 0.5, 3: 0.7, 4: 0.8, 5: 0.9}},
        {condition: productCode == "EBM3GUBRR" && contractTerm == "3" && paymentFrequency == "2", outputs: {1: 0, 2: 0, 3: 0.5, 4: 0, 5: 0}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
