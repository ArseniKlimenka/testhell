'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterComments(input) {

    return basicFilterByColumnName(input, 'comments');
};
