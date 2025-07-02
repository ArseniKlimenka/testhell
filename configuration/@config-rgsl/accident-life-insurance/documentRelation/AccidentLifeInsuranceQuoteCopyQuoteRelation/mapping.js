'use strict';

const { setCopyQuoteMapping } = require('@config-rgsl/life-insurance/lib/copyQuoteHelper');

module.exports = function mapping(body) {

    const result = setCopyQuoteMapping(body, this);
    return { body: result };
};
