'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function partnerNameURLMapping(input) {

    /*
    // for "targetType": "Url" (opens in new window)
    if (input.context.Body.parentCode) {
        return uriBuilder.getOrganisationUnitUri(
            input.context.ConfigurationCodeName,
            input.context.Body.parentCode
        );
    }
    */

    // for "targetType": "Entity" (opens in the same window)
    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "ServiceProvider",
                configurationCodeName: "Partner",
                code: input.context.Body.partnerCode,
                version: "1"
            }
        }
    };

};
