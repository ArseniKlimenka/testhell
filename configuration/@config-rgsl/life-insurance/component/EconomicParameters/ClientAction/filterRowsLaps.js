'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsLaps(input) {

    return basicFilterByColumnName(input, 'laps');
};
