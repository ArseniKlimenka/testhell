'use strict';

const { generateOutput } = require('@config-rgsl/life-insurance/lib/contractSearchDataProviderHelper');

module.exports = function searchDocumentApplyFunction(input, output) {

    output = generateOutput(input, output);
};
