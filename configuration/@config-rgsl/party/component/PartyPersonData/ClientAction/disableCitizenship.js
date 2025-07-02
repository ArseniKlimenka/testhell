'use strict';

module.exports = function disableCitizenship(input) {

    return this.view.areAllElementsDisabled() || input.data.isStatelessPerson;

};
