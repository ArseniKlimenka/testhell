const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapping(input) {
    const {
        body,
        number,
    } = input;

    return {
        "ACC_IMPL.REFERENCE_NUMBER": [
            {
                REFERENCE_NO: number, // has to be unique
                DOCUMENT_NO: number,
                PAYMENT_TYPE_CODE: 'Transfer',
                CURRENCY_CODE: currency.localCurrency,
                DOCUMENT_TYPE_ID: allocationDocumentType.REGISTRY,
            },
        ]
    };
};

