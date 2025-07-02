'use strict';

module.exports = function mapping(input) {

    const contractNumber = this.businessContext.originalDocumentNumber ?? this.businessContext.rootData.mainAttributes?.contract?.number;

    return {
        data: {
            criteria: {
                contractNumber: contractNumber
            }
        }
    };
};

