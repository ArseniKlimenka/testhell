const commonBodyMappingHelper = require('@config-rgsl/party/lib/partyCommonBodyMappingHelper');

module.exports = function mapping(input) {

    const commonBody = {};
    commonBodyMappingHelper.mapCommonBody(commonBody, input);

    return commonBody;

};
