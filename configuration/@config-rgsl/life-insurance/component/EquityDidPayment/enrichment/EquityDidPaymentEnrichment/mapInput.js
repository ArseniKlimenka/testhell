'use strict';

module.exports = function mapping(input) {

    const body = this?.businessContext?.rootData;
    const contractNumber = body?.contract?.number;

    const output = {
        contractNumber
    };

    return output;

};
