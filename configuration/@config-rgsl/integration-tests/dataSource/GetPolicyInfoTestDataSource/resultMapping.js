module.exports = function resultMapping(input) {

    if (input.length === 1) {
        input = input[0];

        return {
            contractNumber: input.CONTRACT_NUMBER,
            state: input.STATE,
            refExists: input.REF_EXISTS === 1,
            ppLoadDate: input.PP_LOAD_DATE,
            commLoadDate: input.COMM_LOAD_DATE,
            invLoadDate: input.INV_LOAD_DATE,
        };
    }
};

