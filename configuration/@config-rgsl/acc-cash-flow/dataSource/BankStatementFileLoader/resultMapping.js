module.exports = function resultMapping(input) {

    if (!Array.isArray(input.Document.Items)) {
        if (!Array.isArray(input.Document.Items.Item)) {
            input.Document.Items = [input.Document.Items.Item];
        }
        else {
            input.Document.Items = input.Document.Items.Item;
        }
    }

    const bankStatementRequest = {
        items: input.Document.Items.map(item => {
            return {
                bankStatementItemNo: item.No,
                incomeSourceId: parseInt(item.IncomeSourceId),
                direction: parseInt(item.Direction),
                paymentDescription: item.PaymentDescription,
                originalPaymentDescription: item.OriginalPaymentDescription,
                currencyCode: item.CurrencyCode,
                amount: parseFloat(item.Amount),
                paymentDate: item.PaymentDate,
                transactionDate: item.TransactionDate,
                isRegistry: parseBool(item.IsRegistry),
                isAcquiring: parseBool(item.IsAcquiring),
                nonAcceptance: parseBool(item.NonAcceptance),
                toleranceType: parseInt(item.ToleranceType),
                debtor: {
                    name: item.Debtor.Name,
                    type: item.Debtor.Type,
                    bankAccountNo: item.Debtor.BankAccountNo,
                },
                creditor: {
                    name: item.Creditor.Name,
                    type: item.Creditor.Type,
                    bankAccountNo: item.Creditor.BankAccountNo,
                },
                paymentSourceId: item.PaymentSourceId ? parseInt(item.PaymentSourceId) : undefined,
                isMigrated: item.IsMigrated,
                rgslGuid: item.RgslGuid,
            };
        })
    };

    return {
        data: bankStatementRequest,
        $recordKey: newGuid()
    };
};

function parseBool(value) {
    return Boolean(JSON.parse(value.toLocaleLowerCase()));
}

function newGuid() {
    const requestId = "666xxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return requestId;
}
