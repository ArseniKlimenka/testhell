'use strict';

module.exports = function policyMapping({
    number,
    body,
}, sinkExchange) {

    const paymentOrderItems = body.paymentOrderItems ?? [];

    const recipientLink = [];
    const recipientSat = [];
    const insuranceActSat = [];
    const nettedDocuments = body.paymentOrderNetting?.nettedDocuments ?? [];

    if (body.recipientInformation.partyCodeName) {

        recipientLink.push({
            PAYMENT_ORDER_NUMBER: number,
            PARTY_CODE: body.recipientInformation.partyCodeName,
        });

        recipientSat.push({
            PAYMENT_ORDER_NUMBER: number,
            PARTY_CODE: body.recipientInformation.partyCodeName,
            FULL_NAME: body.recipientInformation.partyFullName,
            INN_NUMBER: body.recipientInformation.innNumber,
            KPP_NUMBER: body.recipientInformation.kppNumber,
            PARTY_TYPE: body.recipientInformation.partyType,
            BANK_BIC: body.recipientInformation.bankBIC,
            CORRESPONDENT_BANK_ACCOUNT: body.recipientInformation.correspondentBankAccount,
            BANK_ACCOUNT: body.recipientInformation.bankAccountNumber,
        });
    }

    if (body.paymentOrderInformation.insuranceAct) {

        insuranceActSat.push({
            PAYMENT_ORDER_NUMBER: number,
            ACT_NUMBER: body.paymentOrderInformation.insuranceAct.actNumber,
            ACT_DATE: body.paymentOrderInformation.insuranceAct.actDate,
            EXECUTOR_PARTY_CODE: body.paymentOrderInformation.insuranceAct.executorPartyCode,
            EXECUTOR_FULL_NAME: body.paymentOrderInformation.insuranceAct.executorFullName,
            SIGNED_ON: body.paymentOrderInformation.insuranceAct.signedOn,
            SIGNER_CODE: body.paymentOrderInformation.insuranceAct.signerPartyCode,
            SIGNER_FULL_NAME: body.paymentOrderInformation.insuranceAct.signerFullName,
            SIGNER_USERNAME: body.paymentOrderInformation.insuranceAct.signerUsername
        });
    }

    const result = {

        'ACC_IMPL.PAYMENT_ORDER_HUB': [
            {
                PAYMENT_ORDER_NUMBER: number
            }
        ],

        'ACC_IMPL.PAYMENT_ORDER_SAT': [
            {
                PAYMENT_ORDER_NUMBER: number,
                PAYMENT_ORDER_TYPE: body.paymentOrderInformation.paymentOrderType,
                PAYMENT_ORDER_SUBTYPE: body.paymentOrderInformation.paymentOrderSubType,
                REFERENCE_NUMBER: body.paymentOrderInformation.referenceNumber,
                PAYMENT_ORDER_DATE: body.paymentOrderInformation.paymentOrderDate,
                PAYMENT_METHOD: body.paymentOrderInformation.paymentMethod,
                CONTRACT_NUMBER: body.paymentOrderInformation.contractNumber,
                CONTRACT_AMENDMENT_NUMBER: body.paymentOrderInformation.contractAmendmentNumber,
                BASE_DOC_RECIPIENT_NAME: body.paymentOrderInformation.recipientNameFromBaseDocument,
                BANK_ACCOUNT_NUMBER: body.paymentOrderInformation.payerBankAccountNumber,
                NON_ACCEPTANCE: body.paymentOrderInformation.nonAcceptance,
                NON_ACCEPTANCE_NUMBER: body.paymentOrderInformation.numberOfNonAcceptancePayment,
                IS_AQUIRING: body.paymentOrderInformation.isAcquiring,
                IS_COOL_OFF: body.paymentOrderInformation.isCoolOffPeriod,
                PO_CURRENCY_CODE: body.paymentOrderAmounts.paymentOrderCurrencyCode,
                PAYMENT_CURRENCY_CODE: body.paymentOrderAmounts.paymentCurrencyCode,
                DOC_CURRENCY_AMOUNT: body.paymentOrderAmounts.paymentAmountInDocCurrency,
                PO_CURRENCY_AMOUNT: body.paymentOrderAmounts.totalPaymentAmount,
                EXCHANGE_RATE: body.paymentOrderAmounts.exchangeRate,
                FIXED_EXCH_RATE: body.paymentOrderAmounts.fixedExchangeRate,
                USE_FIXED_EXCH_RATE: body.paymentOrderAmounts.useFixedExchangeRate ?? false,
                ORIGINAL_TOTAL_AMOUNT: body.paymentOrderAmounts.originalTotalAmount,
                TOTAL_NETTED_AMOUNT: body.paymentOrderNetting?.totalNettingAmount,
                NETTED_DOCS_COUNT: body.paymentOrderNetting?.nettedDocumentsCount,
                TAX_AMOUNT_LC: body.paymentOrderAmounts.taxAmountLC,
                PAYMENT_DESCRIPTION: body.paymentOrderAmounts.paymentDescription,
                IS_MANUAL: body.paymentOrderInformation.isManual,
                SHOULD_USE_NETTING: body.paymentOrderInformation.shouldUseNetting,
                IS_CNL_NETTING: body.paymentOrderInformation.isCanelledNetting,
                IS_CRT_FROM_NETTING: body.paymentOrderInformation.isCreatedFromNetting,
                ORIGINAL_PO_NUMBER: body.paymentOrderInformation.originalPaymentOrderNumber,
                PARENT_PO_NUMBER: body.paymentOrderInformation.parentPaymentOrderNumber
            }
        ],

        'ACC_IMPL.PAYMENT_ORDER_ITEM_SAT': paymentOrderItems.map(item => {

            return {
                PAYMENT_ORDER_NUMBER: number,
                ITEM_TYPE: item.itemType,
                PO_CURRENCY_AMOUNT: item.paymentOrderCurrencyAmount,
                PAYMENT_CURRENCY_AMOUNT: item.paymentCurrencyAmount
            };
        }),

        'ACC_IMPL.PO_RECIPIENT_LINK': recipientLink,
        'ACC_IMPL.PO_RECIPIENT_SAT': recipientSat,

        'ACC_IMPL.PO_NETTED_CONTRACT_LINK': nettedDocuments.map(item => {

            return {
                PAYMENT_ORDER_NUMBER: number,
                CONTRACT_NUMBER: item.documentNumber
            };
        }),

        'ACC_IMPL.PO_NETTED_CONTRACT_SAT': nettedDocuments.map(item => {

            return {
                PAYMENT_ORDER_NUMBER: number,
                CONTRACT_NUMBER: item.documentNumber,
                CONTRACT_CURRENCY: item.documentCurrency,
                INITIAL_OPEN_AMOUNT: item.initialOpenAmount,
                NETTED_AMOUNT: item.nettedAmount,
                NETTED_AMOUNT_DOC_CURRENCY: item.nettedAmountInDocCurrency,
                EXCHANGE_RATE: item.exchangeRate
            };
        }),

        'ACC_IMPL.PO_INSURANCE_ACT_SAT': insuranceActSat
    };

    return result;
};
