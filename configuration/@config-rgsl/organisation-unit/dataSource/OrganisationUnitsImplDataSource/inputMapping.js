'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.name = null;
    output.parameters.businessCode = null;
    output.parameters.partnerCode = null;
    output.parameters.headOrgUnitCode = null;
    output.parameters.userAdditionalOrgUnits = null;
    output.parameters.orgUnitCode = null;

    if (input.data.criteria.name) {
        output.parameters.name = '%' + input.data.criteria.name + '%';
    }

    if (input.data.criteria.businessCode) {
        output.parameters.businessCode = input.data.criteria.businessCode;
    }

    if (input.data.criteria.partnerCode) {
        output.parameters.partnerCode = input.data.criteria.partnerCode;
    }

    if (input.data.criteria.headPartnerCode) {
        output.parameters.headPartnerCode = input.data.criteria.headPartnerCode;
    }

    if (input.data.criteria.headOrgUnitCode) {
        output.parameters.headOrgUnitCode = input.data.criteria.headOrgUnitCode;
    }

    if (input.data.criteria.orgUnitCode) {
        output.parameters.orgUnitCode = input.data.criteria.orgUnitCode;
    }

    if (input.data.criteria.userAdditionalOrgUnits && input.data.criteria.userAdditionalOrgUnits.length > 0) {
        output.parameters.userAdditionalOrgUnits = JSON.stringify(input.data.criteria.userAdditionalOrgUnits);
    }

    return output;

};
