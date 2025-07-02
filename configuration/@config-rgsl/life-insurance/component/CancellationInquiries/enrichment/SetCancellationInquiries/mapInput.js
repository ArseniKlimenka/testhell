module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                cancellationNumber: this.businessContext.documentNumber
            }
        }
    };

    return output;
};
