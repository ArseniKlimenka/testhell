"use strict";

const mappingHelper = require('@config-rgsl/life-insurance/lib/commonSchemaMappingHelper');

module.exports = function mapping(input) {

    return mappingHelper.generateCommonBody(input, this);

};
