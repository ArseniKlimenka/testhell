'use strict';

module.exports = function (input) {

    const contractNumber = input?.data?.criteria?.contractNumber;
    if (!contractNumber) {
        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            contractNumber: contractNumber
        }
    };

    return output;
};
