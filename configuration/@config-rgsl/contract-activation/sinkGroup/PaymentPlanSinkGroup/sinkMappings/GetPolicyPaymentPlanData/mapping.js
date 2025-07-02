module.exports = function mapping(input) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: [input.contractNumber],
                }
            }
        }
    };
};
