const { bankStatementDocumentType } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

function getDocumentType(rgslValue) {
    const value = rgslValue.replace(/\s/g, '').toUpperCase();

    switch (value) {
        case 'ПОСТУПЛЕНИЕНАРАСЧЕТНЫЙСЧЕТ': {
            return bankStatementDocumentType.ACCOUNT_RECEIPT;
        }
        case 'СПИСАНИЕСРАСЧЕТНОГОСЧЕТА': {
            return bankStatementDocumentType.ACCOUNT_WRITEOFF;
        }
        default: {
            throw "Wrong payment type";
        }
    }
}

module.exports = {
    getDocumentType,
};
