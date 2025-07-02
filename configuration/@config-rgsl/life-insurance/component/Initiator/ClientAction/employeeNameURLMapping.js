'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function employeeNameURLMapping(input) {

    // for "targetType": "Url" (opens in new window)
    if (input.componentContext.employeeCode) {
        return uriBuilder.getEntityUri(
            "ServiceProvider",
            "Employee",
            input.componentContext.employeeCode
        );
    }

    /*
    // for "targetType": "Entity" (opens in the same window)
    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "ServiceProvider",
                configurationCodeName: "Employee",
                code: input.componentContext.employeeCode,
                version: "1"
            }
        }
    };
    */

};
