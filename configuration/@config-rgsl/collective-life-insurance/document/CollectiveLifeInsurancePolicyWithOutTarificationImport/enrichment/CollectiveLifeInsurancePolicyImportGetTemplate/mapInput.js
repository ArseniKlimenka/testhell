module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                productCode: input.productCode,
                withTarification: input.withTarification
            }
        }
    };
};
