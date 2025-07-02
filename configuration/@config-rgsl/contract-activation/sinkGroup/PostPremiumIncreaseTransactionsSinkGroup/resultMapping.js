'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { reduceGroupBy } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function resultMapping(sinkInput, sinkExchange) {

    const invoices = sinkExchange.resolveContext('invoices');
    let affectedContracts;

    if (invoices && invoices.length > 0) {
        const contracts = reduceGroupBy(invoices, ['mainContractNumber', 'newPostedUntilDate'], 'lines');
        affectedContracts = contracts.map(_ => ({
            contractNumber: _.mainContractNumber,
            affectedDateFrom: dateUtils.getMinOfDates(_.lines.map(i => i.postingDate)),
            newPostedUntilPostingDate: _.newPostedUntilDate,
        }));
    }

    return {
        affectedContracts: affectedContracts ?? [],
    };
};
