'use strict';

module.exports = function prepareContractLink(input) {

    const { resultData } = input.data;

    const output = {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'Contract',
                configurationCodeName: resultData.contractConfCodeName ?? resultData.metadata?.configuration?.name,
                version: '1',
                documentNumber: resultData.contractNumber ?? resultData.businessNumber
            }
        }
    };

    return output;

};
