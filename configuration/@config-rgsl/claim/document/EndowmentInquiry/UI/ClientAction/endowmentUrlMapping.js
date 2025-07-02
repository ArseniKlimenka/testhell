'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function endowmentUrlMapping(input) {

    const link = uriBuilder.getEndowmentUri(input.data.Body.endowmentNumber);
    return link;
};
