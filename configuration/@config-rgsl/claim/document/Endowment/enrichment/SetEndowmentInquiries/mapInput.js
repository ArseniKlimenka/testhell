module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                endowmentNumber: this.businessContext.documentNumber
            }
        }
    };

    return output;
};
