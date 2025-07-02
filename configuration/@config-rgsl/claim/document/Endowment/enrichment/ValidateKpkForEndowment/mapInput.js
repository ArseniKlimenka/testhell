'use strict';

module.exports = function mapping(input) {
    const endowmentNumber = this.businessContext.documentNumber;
    if (!endowmentNumber) {
        return;
    }

    const request = {
        endowmentNumber,
    };

    return request;
};
