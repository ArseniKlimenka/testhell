'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext?.rootData;
    const contractNumber = body?.contract?.number;
    const contractConfigurationName = body?.contract?.configurationName;
    const requestNumber = this.businessContext?.documentNumber;

    if (!contractNumber || !contractConfigurationName) {
        return;
    }

    const output = {
        contractNumber,
        contractConfigurationName,
        requestNumber
    };

    return output;
};
