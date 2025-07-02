'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isPOItemsTableRowActionAllowed(input) {

    const isManual = input.context.Body.paymentOrderInformation.isManual;

    if (!isSaveOperationAvailable(this.view)) {

        return {
            delete: false,
            edit: false
        };
    }
    else if (isManual) {

        return {
            delete: true,
            edit: true
        };
    }


    return {
        delete: false,
        edit: false
    };

};
