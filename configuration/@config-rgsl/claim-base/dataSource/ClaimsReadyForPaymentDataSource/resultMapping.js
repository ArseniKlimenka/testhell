'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.claimNumber = input.CLAIM_NUMBER;
    output.claimState = input.CLAIM_STATE;
    output.activityDate = input.ACTIVITY_DATE ? dateTimeUtils.parseToLocalDate(input.ACTIVITY_DATE).toString() : undefined;
    output.riskName = input.RISK_NAME;
    output.applicationDate = input.STATEMENT_APPLICATION_DATE;
    output.insuredEventNumber = input.IE_NUMBER;
    output.insuredEventDate = input.IE_DATE;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.contractType = input.CONTRACT_TYPE;
    output.productName = input.PRODUCT_NAME;
    output.productGroup = input.PRODUCT_GROUP;
    output.productGroupName = input.PRODUCT_GROUP ? translationUtils.getTranslation('dataSource/ClaimsReadyForPaymentDataSource/1', 'enum', 'productGroup', input.PRODUCT_GROUP, 'ProductGroup') : undefined;
    output.policyHolderCode = input.HOLDER_CODE;
    output.policyHolderType = input.HOLDER_TYPE;
    output.policyHolderName = input.HOLDER_NAME;
    output.amountInDocCurrency = input.PAYMENT_AMOUNT_DOC_CUR;
    output.docCurrencyCode = input.CONTRACT_CURRENCY;
    output.amountInRubCurrency = input.PAYMENT_AMOUNT_RUB_CUR;

    return output;
};
