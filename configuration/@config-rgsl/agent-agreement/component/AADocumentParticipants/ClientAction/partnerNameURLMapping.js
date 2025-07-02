'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function partnerNameURLMapping(input) {

    if (input.componentContext.agent) {

        return uriBuilder.getServiceProviderUri(
            input.componentContext.agent.serviceProviderType,
            input.componentContext.agent.serviceProviderCode
        );
    }
};
