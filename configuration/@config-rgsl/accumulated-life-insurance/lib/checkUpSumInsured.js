
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * checkUpSumInsured
     *
     * @param  {object} input Expected input properties: productCode, paymentFrequency, installmentAmount
     */
    function checkUpSumInsured(input) {
        // destructure input
        const {productCode, paymentFrequency, installmentAmount} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: productCode == "EHVP" && paymentFrequency == "1" && installmentAmount == 700000, outputs: {sumInsured: 115000}},
            {condition: productCode == "EHVP" && paymentFrequency == "1" && installmentAmount == 3000000, outputs: {sumInsured: 250000}},
            {condition: productCode == "EHVP" && paymentFrequency == "1" && installmentAmount == 5000000, outputs: {sumInsured: 325000}},
            {condition: productCode == "EHVP" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 200000, outputs: {sumInsured: 115000}},
            {condition: productCode == "EHVP" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 400000, outputs: {sumInsured: 250000}},
            {condition: productCode == "EHVP" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 600000, outputs: {sumInsured: 325000}},
            {condition: productCode == "EHVP2" && paymentFrequency == "1" && installmentAmount == 700000, outputs: {sumInsured: 115000}},
            {condition: productCode == "EHVP2" && paymentFrequency == "1" && installmentAmount == 3000000, outputs: {sumInsured: 250000}},
            {condition: productCode == "EHVP2" && paymentFrequency == "1" && installmentAmount == 5000000, outputs: {sumInsured: 325000}},
            {condition: productCode == "EHVP2" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 200000, outputs: {sumInsured: 115000}},
            {condition: productCode == "EHVP2" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 680000, outputs: {sumInsured: 250000}},
            {condition: productCode == "EHVP2" && ["2", "3"].includes(paymentFrequency) && installmentAmount == 1600000, outputs: {sumInsured: 325000}}
        ]
            .filter(r => r.condition)
            .map(r => r.outputs);

        if(allOutputs.length === 0) {
            return undefined;
        }

        // return outputs based on hit policy (UNIQUE)
        return allOutputs[0];

    }


    // exported functions
    return {
        checkUpSumInsured: checkUpSumInsured
    };
})();
