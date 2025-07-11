'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onChangeItemConfirmation2023(input, ambientProperties) {

    if (input.componentContext) {
        input.componentContext.lastUpdateDate = DateTimeUtils.newDateAsString();
    }

    this.view.reevaluateRules();

};
