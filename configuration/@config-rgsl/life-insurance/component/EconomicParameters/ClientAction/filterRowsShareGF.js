'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsShareGF(input) {

    return basicFilterByColumnName(input, 'shareGF');
};
