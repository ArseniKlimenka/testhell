const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function policyMapping(input) {
    const {
        commonBody,
        originalDocumentNumber,
    } = input;

    let payer;
    let currency;

    if (commonBody && commonBody.parties && commonBody.parties.otherParties) {
        payer = commonBody.parties.otherParties.find(p => p.roleCode === 'Payer');

        if (payer && payer.attributes && payer.attributes.paymentCurrency) {
            currency = payer.attributes.paymentCurrency;
        }
    }

    if (currency === undefined &&
        commonBody.items &&
        commonBody.items.length > 0 &&
        commonBody.items[0].attributes) {

        currency = commonBody.items[0].attributes.currency;
    }

    return {
        "ACC_IMPL.REFERENCE_NUMBER": [
            {
                REFERENCE_NO: originalDocumentNumber, // has to be unique
                DOCUMENT_NO: originalDocumentNumber,
                PAYMENT_TYPE_CODE: payer.attributes.paymentType,
                CURRENCY_CODE: currency,
                DOCUMENT_TYPE_ID: allocationDocumentType.POLICY,
            }
        ],
    };
};

