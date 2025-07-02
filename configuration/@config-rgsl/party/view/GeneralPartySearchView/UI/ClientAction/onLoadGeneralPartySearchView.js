'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onLoadGeneralPartySearchView(input) {

    const additionalProtectedFields = this.view.getContext().viewContext.additionalProtectedFields || [];

    let protectedFields = ['createdOnFrom'];
    protectedFields = protectedFields.concat(additionalProtectedFields);

    this.setProtectedFields(protectedFields);

    input.context.request.data.criteria.createdOnFrom = dateTimeUtils.formatDate('1900-01-01');

    this.view.getContext().viewContext.shoudShowPartyCode = true;
};
