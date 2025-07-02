'use strict';

module.exports = function PreparePartnerLink(input) {

    const { serviceProviderCode } = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'ServiceProvider',
                configurationCodeName: 'Reinsurer',
                version: 1,
                code: serviceProviderCode
            }
        }
    };

};
