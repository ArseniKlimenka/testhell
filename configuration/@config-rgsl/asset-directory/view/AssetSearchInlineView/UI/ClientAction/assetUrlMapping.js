'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function assetUrlMapping(input) {

    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: lifeInsuranceConstants.universalVersionedDocument.Entity.UniversalVersionedDocument,
                configurationCodeName: 'Asset',
                version: '1',
                documentNumber: searchData.number,
            }
        }
    };
};
