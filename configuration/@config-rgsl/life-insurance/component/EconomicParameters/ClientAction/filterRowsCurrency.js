'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsCurrency(input) {

    return basicFilterByColumnName(input, 'currency');
};
