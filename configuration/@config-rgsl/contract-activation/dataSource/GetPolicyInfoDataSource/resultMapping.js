module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        mainContractNumber: input.MAIN_CONTRACT_NUMBER,
        currencyCode: input.CURRENCY_CODE,
        firstInstallmentPaid: input.FIRST_INSTALLMENT_PAID,
        invoiceOnActivation: input.INVOICE_ON_ACTIVATION,
        startDate: input.START_DATE,
        amendmentNumber: input.AMENDMENT_NUMBER,
        amendmentValidFrom: input.AMENDMENT_VALID_FROM,
    };
};
