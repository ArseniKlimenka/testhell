'use strict';

module.exports = function clearOrgUnit(input) {

    if (input.componentContext.organisationUnit.code) {

        delete input.componentContext.organisationUnit.name;
        delete input.componentContext.organisationUnit.code;
    }
};
