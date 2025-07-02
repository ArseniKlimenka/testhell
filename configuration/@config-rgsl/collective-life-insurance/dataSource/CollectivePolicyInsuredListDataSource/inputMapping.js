'use strict';

module.exports = function (input) {

    const contractNumber = input?.data?.criteria?.contractNumber;
    const fullName = input?.data?.criteria?.fullName;

    if (!contractNumber) {
        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            contractNumber: contractNumber
        }
    };

    if (fullName) {

        output.parameters.fullName = `%${fullName}%`;
    }

    return output;
};
