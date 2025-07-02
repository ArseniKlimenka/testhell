'use strict';

const { reduceGroupBy, compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(sinkInput, sinkExchange) {

    const pcs = sinkExchange.resolveContext('pcs');
    const commissions = sinkExchange.resolveContext('commissions');

    for (const pc of pcs) {

        const polCommissions = commissions.filter(_ => _.contractNumber == pc.documentNo && _.dueDate == pc.installmentDueDate);

        if (polCommissions.length > 1) {
            throw 'There should be only one commission for ' + pc.documentNo + ', ' + pc.installmentDueDate;
        }

        const polCommission = polCommissions[0];
        if (!polCommission) {
            pc.aaCommRate = 0;
            continue;
        }

        pc.aaCommRate = polCommission.rate;
        pc.aaExpensesRate = polCommission.expensesRate;
        pc.aaNaturalPersonRate = polCommission.naturalPersonRate;
        pc.aaSolePropriatorRate = polCommission.solePropriatorRate;
    }

    const items = reduceGroupBy(
        pcs,
        [
            'documentNo',
            'sourceLineId',
            'installmentDueDate',
            'bankStatementItemId',
            'aaCommRate',
            'aaExpensesRate',
            'aaNaturalPersonRate',
            'aaSolePropriatorRate',
            'docExpensesRate',
            'docNaturalPersonRate',
            'docSolePropriatorRate',
            'docCommRate',
            'manualCommRate',
            'isTechnical',
        ],
        'lines'
    ).sort(compareByObjectProperties(['documentNo', 'sourceLineId', 'bankStatementItemId']));

    sinkExchange.mapContext('items', items);
    sinkExchange.mapContext('renew', sinkInput.renew);
    const sequenceParameters = [];

    sequenceParameters.push({ sequenceName: 'ACC_IMPL.CA_ACT_ITEM', count: items.length, startValueOffset: 0 });

    return {
        parameters: {
            sequenceParameters: sequenceParameters
        }
    };
};
