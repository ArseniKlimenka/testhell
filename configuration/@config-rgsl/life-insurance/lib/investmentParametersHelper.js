'use strict';

function commWithdrawalFundsToArray(commWithdrawalFunds) {

    const result = [];

    const entries = Object.entries(commWithdrawalFunds);

    for (let i = 0; i < entries.length - 1; i++) {

        const [key1, value1] = entries[i];

        let basisForPayment = `${i}`;

        if (i > 2) {
            basisForPayment = `${i} и более`;
        }

        result.push({
            basisForPayment: basisForPayment,
            insuredEventOccurrence: 0,
            earlyTerminationContract: parseFloat(value1),
            insuredPersonAppeal: parseFloat(value1)
        });
    }

    return result;
}

module.exports = {
    commWithdrawalFundsToArray
};
