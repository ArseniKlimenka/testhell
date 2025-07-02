module.exports = function resultMapping(input) {

    if (input.length === 1) {
        input = input[0];

        return {
            amendmentNumber: input.AMENDMENT_NUMBER,
            state: input.STATE,
        };
    }
};

