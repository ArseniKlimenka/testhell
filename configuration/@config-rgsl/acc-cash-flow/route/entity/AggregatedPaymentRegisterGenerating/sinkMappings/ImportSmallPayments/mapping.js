'use strict';

const { codeTableItems } = require('@adinsure/runtime');

module.exports = function createDocument(input, sinkExchange) {

    const smallPayments = sinkExchange.smallPayments;
    const allocationsToRegistry = sinkExchange.allocationsToRegistry;
    // temporary solution because we dont know which data from registry we will use for creating small payments
    const bsiData = allocationsToRegistry[0].resultData;
    const bsiRegistryType = codeTableItems.getCodeTableItem('BsiRegistryType', input.body.sourceFileFormat);

    const resultItems = smallPayments
        .filter(_ => !_.hasPayment)
        .filter(_ => _.paymentAmount >= 0)
        .map(_ => {
            return {
                bankStatementItemNo: input.number + ':' + _.smallPaymentNumber,
                incomeSourceId: bsiRegistryType.incomeSourceId,
                direction: bsiData.direction,
                registryReferenceNo: input.number,
                aggregatedPaymentRegisterId: _.aggregatedPaymentRegisterId,
                paymentDescription: _.paymentDescription,
                currencyCode: _.currencyCode,
                amount: _.paymentAmount,
                paymentDate: _.paymentDate,
                transactionDate: bsiData.transactionDate,
                isRegistry: false,
                isAcquiring: bsiData.isAcquiring,
                nonAcceptance: bsiData.nonAcceptance,
                toleranceType: bsiData.toleranceType,
                debtorName: _.payerFullName,
                debtorType: bsiData.debtorType,
                debtorBankAccountNo: bsiData.debtorAccountNo,
                creditorName: bsiData.creditorName,
                creditorType: bsiData.creditorType,
                creditorBankAccountNo: bsiData.creditorAccountNo,
                segment: _.segment,
                paymentSourceId: 2,
            };
        });

    return {
        request: {
            items: resultItems,
        }
    };
};
