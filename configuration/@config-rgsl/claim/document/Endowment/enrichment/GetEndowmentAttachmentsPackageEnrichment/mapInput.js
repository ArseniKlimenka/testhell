'use strict';

module.exports = function mapInput(input) {

    const endowmentNumber = this.businessContext.documentNumber;

    return {
        data: {
            criteria: {
                endowmentNumber
            }
        }
    };
};
