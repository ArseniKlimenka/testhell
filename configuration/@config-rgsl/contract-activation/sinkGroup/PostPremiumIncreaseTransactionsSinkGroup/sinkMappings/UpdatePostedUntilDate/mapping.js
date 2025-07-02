'use strict';

const { reduceGroupBy } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(input, sinkExchange) {
    const invoices = sinkExchange.resolveContext('invoices');
    if (!invoices) {
        return;
    }

    const groupedPostingData = reduceGroupBy(invoices, ['mainContractNumber', 'newPostedUntilDate'], undefined, (p, c) => {
        return {
            maxPPLoadDate: p.maxPPLoadDate && new Date(c.maxPPLoadDate) > new Date(p.maxPPLoadDate) ? p.maxPPLoadDate : c.maxPPLoadDate,
        };
    }, ({}));

    const result = {
        'ACC_IMPL.POSTED_PAYMENT_PLAN_SAT': groupedPostingData.map(contract => {
            return {
                CONTRACT_NUMBER: contract.mainContractNumber,
                POSTED_UNTIL_POSTING_DATE: contract.newPostedUntilDate,
                LAST_DATE_OF_POSTING: contract.maxPPLoadDate,
            };
        }),
    };

    return result;
};
