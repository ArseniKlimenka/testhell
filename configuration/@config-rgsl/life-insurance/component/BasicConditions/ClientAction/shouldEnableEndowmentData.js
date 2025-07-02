'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function shouldEnableEndowmentData(input, ambientProperties) {


    if (this.view.areAllElementsDisabled()
        || !isSaveOperationAvailable(this.view)
        || shouldDisableSaveableContract(input, this.view)) {

        return false;
    }

    return true;
};
