"use strict";

const mappingHelper = require('@config-rgsl/life-insurance/lib/requestMappingHelper');

module.exports = function mapping(input) {

    return mappingHelper.generateCommonBody(input, this);

};
