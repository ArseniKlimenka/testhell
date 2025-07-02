'use strict';

module.exports = function orgUnitNameURLMapping(input) {

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "OrganisationUnit",
                configurationCodeName: "OrganisationUnit",
                code: input.context.Body.orgUnitCode,
                version: "1",
            }
        }
    };

};
