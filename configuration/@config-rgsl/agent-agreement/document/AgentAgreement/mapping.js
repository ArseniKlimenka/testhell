'use strict';
const { getCommonBody } = require('@config-rgsl/agent-agreement-base/lib/AACommonBodyHelper');

module.exports = function mapping(input) {

    return getCommonBody(input);
};
