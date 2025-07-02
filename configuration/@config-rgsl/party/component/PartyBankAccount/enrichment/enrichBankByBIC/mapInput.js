module.exports = function mapping(input) {

    if (input.bankBic) {
        return {
            data: {
                criteria: {
                    fullBic: input.bankBic
                }
            }
        };
    }

    return;

};
