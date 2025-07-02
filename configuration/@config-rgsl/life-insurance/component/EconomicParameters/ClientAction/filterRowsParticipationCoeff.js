'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsParticipationCoeff(input) {

    return basicFilterByColumnName(input, 'participationCoeff');
};
