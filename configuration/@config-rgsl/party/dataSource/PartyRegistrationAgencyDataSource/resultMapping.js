'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.agencyCode = input.CODE;
    output.agencyDescription = input.DESCRIPTION;
    output.regionCode = input.REGION_CODE;

    return output;

};
