'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function onLoad(input, ambientProperties) {

    if (input.context.State.Code == 'Draft') {
        const document = input.context.Body;
        if (!document.createdBy) { document.createdBy = ambientProperties.applicationContext.currentUser().getClaims().DisplayName; }
        if (!document.created) { document.created = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT_DATETIME); }
    }
    else {
        this.view.disableAllElements();
    }
};
