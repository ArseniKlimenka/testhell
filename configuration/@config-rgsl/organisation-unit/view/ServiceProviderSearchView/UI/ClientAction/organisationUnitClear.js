'use strict';

module.exports = function organisationUnitClear(input) {
    input.data.request.data.criteria.organisationUnitCode = undefined;
    input.data.request.data.criteria.organisationUnitCodes = undefined;
    input.data.request.data.criteria.organisationUnitName = undefined;
};
