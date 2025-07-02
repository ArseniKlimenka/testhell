const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapInput(input) {

    const amendmentNumber = this.businessContext.documentNumber;

    return {
        data: {
            criteria: {
                contractNumber: amendmentNumber
            }
        }
    };
};
