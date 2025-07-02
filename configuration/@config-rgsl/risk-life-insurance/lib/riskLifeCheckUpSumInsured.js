
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
        const allOutputs = []
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
