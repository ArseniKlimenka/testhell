'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function onLoadServiceProviderSearchView(input) {

    input.context.request.data.criteria.createdOnFrom = dateTimeUtils.formatDate('1900-01-01');
    const context = this.view.getContext();
    let protectedFields = getValue(context, 'viewContext.protectedFields', []);
    protectedFields.push('createdOnFrom');
    const additionalProtectedFields = getValue(context, 'viewContext.additionalProtectedFields', []);
    protectedFields = protectedFields.concat(additionalProtectedFields);
    this.setProtectedFields(protectedFields);
};
