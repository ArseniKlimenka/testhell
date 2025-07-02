'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { updateRuleNumbers } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = function economicParametersCopyRow(input) {

    const existingRow = input.data;
    const newRow = Object.assign({}, existingRow);

    const economicParameters = input.componentContext ?? [];

    newRow.enterValuesDate = DateTimeUtils.dateTimeNow();

    input.componentContext.push(newRow);

    updateRuleNumbers(economicParameters);

    this.view.validate();
};
