module.exports = function mapping(input) {

    return {
        input: {
            data: {
                criteria: {
                    businessCode: input.data.DOCode
                }
            }
        }
    };
};

