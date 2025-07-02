
/* eslint-disable */
/**
 * Premium Coefficients
 *
 * @param  {object} input Expected input properties: productCode, paymentFrequency, installmentAmount
 */
module.exports = function premiumCoefficients(input) {
// destructure input
    const {productCode, paymentFrequency, installmentAmount} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "EHVP2" && paymentFrequency == "1" && installmentAmount == 700000, outputs: {E36404: 0.831106465028522, DLPVV36404: 0.02323828385831242, DNS36404: 0.006, DA36404: 0, CDP36404: 0.07811604086486716, CU10800: 0.061539210248298386, CDH10800: 0.07811604086486716}},
        {condition: productCode == "EHVP2" && paymentFrequency == "1" && installmentAmount == 3000000, outputs: {E36404: 0.9107971783574751, DLPVV36404: 0.025466488661346962, DNS36404: 0.006, DA36404: 0, CDP36404: 0.03037846033633723, CU10800: 0.027357872644840724, CDH10800: 0.03037846033633723}},
        {condition: productCode == "EHVP2" && paymentFrequency == "1" && installmentAmount == 5000000, outputs: {E36404: 0.9113171876827976, DLPVV36404: 0.025481028464391806, DNS36404: 0.006, DA36404: 0, CDP36404: 0.036454152403604674, CU10800: 0.02074763144920591, CDH10800: 0.036454152403604674}},
        {condition: productCode == "EHVP2" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 200000, outputs: {E36404: 0.8065991982309394, DLPVV36404: 0.10801524644981551, DNS36404: 0.0042, DA36404: 0.00005005340321755588, CDP36404: 0.04538307104634482, CU10800: 0.035752430869682765, CDH10800: 0.04538307104634482}},
        {condition: productCode == "EHVP2" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 680000, outputs: {E36404: 0.8065991982309394, DLPVV36404: 0.11657647638811348, DNS36404: 0.0042, DA36404: 0.00004814545190241281, CDP36404: 0.03818657142732135, CU10800: 0.034389608501723436, CDH10800: 0.03818657142732135}},
        {condition: productCode == "EHVP2" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 1600000, outputs: {E36404: 0.8065991982309393, DLPVV36404: 0.10926663591808186, DNS36404: 0.0042, DA36404: 0.000040569434984725144, CDP36404: 0.05091542856976179, CU10800: 0.028978167846232247, CDH10800: 0.05091542856976179}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
