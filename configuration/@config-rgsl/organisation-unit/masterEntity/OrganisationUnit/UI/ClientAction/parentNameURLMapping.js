'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function parentNameURLMapping(input) {

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
                entity: "OrganisationUnit",
                configurationCodeName: input.context.ConfigurationCodeName,
                code: input.context.Body.parentCode,
                version: "1",
            }
        }
    };

};
