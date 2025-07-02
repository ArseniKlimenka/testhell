'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsClientID(input) {

    return basicFilterByColumnName(input, 'clientID');
};
