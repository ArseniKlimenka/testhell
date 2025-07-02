'use strict';

const { dateNow } = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onChangeHasAmendment(input, ambientProperties) {

    delete input.componentContext.hasAmendmentDate;

    if (input.componentContext.hasAmendment) {
        input.componentContext.hasAmendmentDate = dateNow();
    }
};
