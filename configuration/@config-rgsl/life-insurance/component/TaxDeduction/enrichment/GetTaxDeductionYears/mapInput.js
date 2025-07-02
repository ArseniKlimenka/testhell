'use strict';

module.exports = function mapping(input) {

    if (this.businessContext.documentNumber) {

        return; // executed only on amendment creation
    }

    const contractNumber = this.businessContext.originalDocumentNumber;
    const configurationCodeName = this.businessContext.relationSourceDocumentCodeName;

    return {
        data: {
            criteria: {
                contractNumber: contractNumber,
                configurationName: configurationCodeName
            }
        }
    };
};
