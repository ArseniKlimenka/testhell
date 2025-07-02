module.exports = function mapping(input) {

    const contractNumber = this.businessContext.documentNumber;

    if (!contractNumber) { return; }

    const output = {
        data: {
            criteria: {
                contractNumber
            }
        }
    };

    return output;

};
