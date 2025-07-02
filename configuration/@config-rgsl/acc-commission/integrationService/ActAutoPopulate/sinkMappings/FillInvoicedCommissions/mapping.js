'use strict';

const { reduceGroupBy } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(sinkInput, sinkExchange) {

    const actItems = sinkExchange.resolveContext('actItems');
    const invoicedCommissionRequest = reduceGroupBy(
        actItems,
        [
            'referenceNo',
            'dueDate',
        ]
    ).map(_ => ({
        contractNumber: _.referenceNo,
        dueDate: _.dueDate,
    }));

    return {
        invoicedCommissionRequest: invoicedCommissionRequest,
    };
};
