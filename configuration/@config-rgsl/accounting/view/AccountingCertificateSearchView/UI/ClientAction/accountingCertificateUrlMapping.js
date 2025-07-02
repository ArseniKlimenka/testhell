'use strict';

module.exports = function accountingCertificateUrlMapping(input) {

    const searchData = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'UniversalVersionedDocument',
                configurationCodeName: searchData.accountingCertificateConfigurationName,
                version: '1',
                documentNumber: searchData.accountingCertificateNumber,
            }
        }
    };
};
