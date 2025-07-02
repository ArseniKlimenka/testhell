const { newGuid, replaceNullWithUndefined, convertStringDateFormat, exctactSingleWordFromString } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const { getDocumentType } = require('@config-rgsl/acc-cash-flow/lib/rgsl2adinsureBsiHelper');
const { allocationToleranceType } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { bankStatementDirection } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    const ret = {
        bankStatementItemNo: input.documentNumber,
        incomeSourceId: parseInt(input.incomeSourceId),
        direction: getPaymentDirection(input.documentTypeId),
        paymentDescription: input.paymentDescription,
        originalPaymentDescription: input.paymentDescription,
        currencyCode: currency.localCurrency,
        amount: parseFloat(input.amount),
        paymentDate: convertStringDateFormat(input.paymentDate),
        transactionDate: convertStringDateFormat(input.transactionDate),
        isAcquiring: false,
        nonAcceptance: false,
        toleranceType: allocationToleranceType.STANDARD,
        debtor: {
            name: input.debtorName,
            type: exctactSingleWordFromString(input.debtorType),
            bankAccountNo: input.debtorBankAccountNo,
        },
        creditor: {
            name: 'INSURANCE COMPANY, D.D.',
            type: 'ЮЛ',
            bankAccountNo: 'SI20436266963946784',
        },
        paymentSourceId: 1,
        isMigrated: false,
        rgslGuid: input.guid,
        rgslDocumentTypeId: getDocumentType(input.documentTypeId),
    };

    return {
        data: {
            items: [ // "items" for compatibility with BankStatementImportEtlService
                ret
            ]
        },
        $recordKey: newGuid(),
    };
};

function getPaymentDirection(rgslValue) {

    const value = rgslValue?.replace(/\s/g, '').toUpperCase();

    if (value?.includes('ПОСТУПЛЕНИЕ')) {
        return bankStatementDirection.INCOMING;
    } else if (value?.includes('СПИСАНИЕ')) {
        return bankStatementDirection.OUTGOING;
    }
    throw "Wrong payment type";

}
