'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isPOItemsTableAddButtonVisible(input) {

    const isManual = input.context.Body.paymentOrderInformation.isManual;

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }
    else if (isManual) {

        return true;
    }


    return false;

};
