'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function nameURLMapping(input, ambientProperties) {

    // for "targetType": "Url" (opens in new window)
    if (input.context.viewContext.code) {
        return uriBuilder.getOrganisationUnitUri(
            "OrganisationUnit",
            input.context.viewContext.code
        );
    }

    // for "targetType": "Entity" (opens in the same window)
    /*
    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "OrganisationUnit",
                configurationCodeName: "OrganisationUnit",
                version: "1",
                code: input.context.viewContext.code
            }
        }
    };
    */

};
