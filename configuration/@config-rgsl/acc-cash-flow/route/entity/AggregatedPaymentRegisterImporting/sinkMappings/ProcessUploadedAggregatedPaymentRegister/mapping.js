const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(input, sinkExchange) {
    // for date fields expected format yyyy-mm-dd hh:mi:ss
    const importedItems = sinkExchange.resolveContext("importedItems");

    const items = importedItems.map(item => {
        const itemData = item.data;
        return {
            AGGREGATED_PAYMENT_NUMBER: input.number,
            SOURCE_FILE_FORMAT: input.body.sourceFileFormat,
            SMALL_PAYMENT_NUMBER: itemData.smallPaymentNumber,
            PAYMENT_DATE: itemData.paymentDate,
            PAYER_FULL_NAME: itemData.payerFullName,
            PAYMENT_DESCRIPTION: itemData.paymentDescription,
            CONTRACT_BEGIN_DATE: itemData.contractBeginDate,
            PRODUCT_NAME: itemData.productName,
            PAYMENT_AMOUNT: itemData.allocationAmount,
            CURRENCY_CODE: itemData.currencyCode || currency.localCurrency,
            CONTRACT_DURATION: itemData.contractDuration,
            ADDITIONAL_INFORMATION: itemData.additionalInformation,
            SEGMENT: itemData.segment,
            PAYER_BIRTHDAY: itemData.payerBirthday,
            PAYER_EMAIL: itemData.payerEMail,
        };
    });

    return {
        'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER': items,
    };
};
