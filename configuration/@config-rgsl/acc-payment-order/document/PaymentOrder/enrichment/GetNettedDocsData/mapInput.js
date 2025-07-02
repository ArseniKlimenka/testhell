'use strict';

module.exports = function mapping(input) {

    const selectedContracts = input.paymentOrderNetting?.nettedDocuments ?? [];
    const numbers = selectedContracts.map(item => item.documentNumber);

    if (numbers.length === 0) {

        return;
    }

    return {
        data: {
            criteria: {
                contractNumbers: numbers
            }
        }
    };
};
