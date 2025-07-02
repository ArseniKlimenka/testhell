'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableSportTypes(input) {

    if (this.view.areAllElementsDisabled() || !isSaveOperationAvailable(this.view)) {

        return false;
    }

    return true;
};
