'use strict';

module.exports = function mapping(messageContext) {

    const contractNumber = messageContext.body.number;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                }
            }
        }
    };
};
