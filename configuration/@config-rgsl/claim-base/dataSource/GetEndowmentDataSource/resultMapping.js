'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.endowmentNumber = input.ENDOWMENT_NUMBER;
    output.documentState = translationUtils.getTranslation(`document/Endowment/1`, 'states', null, input.ENDOWMENT_STATE);
    output.documentStateCode = input.ENDOWMENT_STATE;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.contractType = input.CONTRACT_TYPE;
    output.eventType = input.TYPE_DESCRIPTION;
    output.eventReason = input.REASON_DESCRIPTION;
    output.riskName = input.RISK_DESCRIPTION;
    output.statementApplicationDate = input.APPLICATION_DATE;
    output.eventDate = input.EVENT_DATE;
    output.productGroupName = translationUtils.getTranslation('dataSource/GetEndowmentDataSource/1', 'enum', 'productGroup', input.PRODUCT_GROUP, 'ProductGroup');
    output.productName = input.PRODUCT_NAME;
    output.policyHolderName = input.HOLDER_NAME;
    output.amountInDocCurrency = input.AMOUNT_CURR;
    output.docCurrencyCode = input.CURRENCY_CODE;
    output.amountInRubCurrency = input.AMOUNT_LC;

    return output;
};
