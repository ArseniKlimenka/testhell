
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * Credit DMS Sum Insured
     *
     * @param  {object} input Expected input properties: creditProgramId, installmentAmount
     */
    function creditDmsSumInsured(input) {
        // destructure input
        const {creditProgramId, installmentAmount} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: creditProgramId == "п00322021" && installmentAmount == 10000, outputs: {sumInsured: 2500000}},
            {condition: creditProgramId == "п00312021" && installmentAmount == 25000, outputs: {sumInsured: 6000000}},
            {condition: creditProgramId == "п00312021" && installmentAmount == 35000, outputs: {sumInsured: 8000000}},
            {condition: creditProgramId == "п00312021" && installmentAmount == 50000, outputs: {sumInsured: 11000000}},
            {condition: creditProgramId == "п00312021" && installmentAmount == 75000, outputs: {sumInsured: 15000000}}
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
        creditDmsSumInsured: creditDmsSumInsured
    };
})();
