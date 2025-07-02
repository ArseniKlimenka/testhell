'use strict';

module.exports = function initReadOnlyFields(input) {

    const stateCode = input.context.State.Code;

    return stateCode === 'Draft';
};
