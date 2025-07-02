module.exports = function mapping({ id, number, state, body }, sinkExchange) {
    sinkExchange.registryNumber = number;

    let remainedAmount = body.summary.totalPaymentAmount;

    const requests = [];

    for (const bsi of body.bankStatementItems) {
        const amount = Math.min(remainedAmount, bsi.amount);
        if (amount === 0) {
            continue;
        }

        remainedAmount -= amount;
        const item = {
            bankStatementItemId: bsi.id,
            payAmount: amount,
            referenceNo: number,
        };
        requests.push(item);
    }

    return {
        request: requests,
    };
};
