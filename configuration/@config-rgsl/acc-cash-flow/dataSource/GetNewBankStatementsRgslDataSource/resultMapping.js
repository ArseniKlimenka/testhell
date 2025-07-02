const { getDocumentType } = require('@config-rgsl/acc-cash-flow/lib/rgsl2adinsureBsiHelper');
const { bankStatementDirection } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function resultMapping(input) {

    return {
        guid: input['m:GUID'],
        no: String(input['m:DocumentNumber']),
        incomeSourceId: parseInt(input['m:FileSource']),
        direction: getPaymentDirection(input['m:PaymentType']),
        paymentDescription: input['m:PaymentPurpose'],
        currencyId: parseInt(input['m:Currency']),
        amount: parseFloat(input['m:TotalSum']),
        paymentDate: convertDateFormats(input['m:FundReceptDate']),
        transactionDate: convertDateFormats(input['m:PostingDate']),
        tolerance: parseInt(input['m:Tolerance']),
        debtor: {
            name: input['m:Payer'],
            type: input['m:PayerType'],
            bankAccountNo: input['m:Account'],
        },
        documentTypeId: getDocumentType(input['m:DocumentType']),
        documentDate: convertDateFormats(input['m:DocumentDate']),
    };
};

function convertDateFormats(stringDate) {
    if (!stringDate) {
        return;
    }

    const dt = stringDate.substring(0, 2);
    const mn = stringDate.substring(2, 4);
    const yr = stringDate.substring(4, 8);

    return yr + '-' + mn + '-' + dt;
}

function getPaymentDirection(rgslValue) {
    switch (rgslValue) {
        case '1': {
            return bankStatementDirection.INCOMING;
        }
        case '2': {
            return bankStatementDirection.OUTGOING;
        }
        default: {
            throw "Wrong payment type";
        }
    }
}
