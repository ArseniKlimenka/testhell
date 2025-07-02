'use strict';

module.exports = function isAplicationInfoEnabled(input) {

    return input.context.State.Code === 'Draft';
};
