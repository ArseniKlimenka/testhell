'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const docNumber = this.businessContext.documentNumber;

    const output = {
        data: {
            endowmentNumber: docNumber,
            body: body
        }
    };

    return output;
};
