'use strict';

module.exports = function apply(document, input, sourceOrPreviousBusinessVersionCommonBody) {

    return Object.assign(Object.assign({}, document), input);
};
