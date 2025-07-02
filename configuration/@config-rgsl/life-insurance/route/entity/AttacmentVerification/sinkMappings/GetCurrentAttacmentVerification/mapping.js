module.exports = function mapping(input) {
    const { body, number, configurationCodeName, commonBody } = input;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: number,
                }
            }
        }
    };
};
