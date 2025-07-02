'use strict';

const { reduceGroupBy } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(sinkInput, sinkExchange) {

    const actItems = sinkExchange.resolveContext('actItems');
    const installmentAmountsRequest = reduceGroupBy(
        actItems,
        [
            'referenceNo',
            'dueDate',
        ],
        'lines'
    ).map(_ => ({
        referenceNo: _.referenceNo,
        dueDate: _.dueDate,
    }));

    return {
        installmentAmountsRequest: installmentAmountsRequest,
    };
};
