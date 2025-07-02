'use strict';

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { reduceGroupBy, compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(input, sinkExchange) {
    const ptNumber = this.businessContext.etlServiceInput.portfolioTransferNumber;
    const allocations = sinkExchange.resolveContext('allocations');

    const allocationsG = reduceGroupBy(
        allocations,
        [
            'bsiId',
        ],
        undefined,
        (p, c) => ({
            payAmount: round(p.payAmount + c.payAmount, 2),
            docAmount: round(p.docAmount + c.docAmount, 2),
        }),
        {
            payAmount: 0,
            docAmount: 0,
        }
    ).sort(compareByObjectProperties(['bsiId'])).filter(_ => _.payAmount !== 0 || _.docAmount !== 0);

    const docSAT = {
        PORTFOLIO_TRANSFER_NUMBER: ptNumber,
        CONTRACT_NUMBER: input.contractNumber,
        STATE: 'AllocationCancelled',
    };

    const paymentsSAT = allocationsG.map(_ => ({
        PORTFOLIO_TRANSFER_NUMBER: ptNumber,
        CONTRACT_NUMBER: input.contractNumber,
        BANK_STATEMENT_ITEM_ID: _.bsiId,
        PAY_AMOUNT: _.payAmount,
        DOC_AMOUNT: _.docAmount,
    }));

    return {
        'ACC_IMPL.PORTFOLIO_TRANSFER_DOCUMENT_SAT': [docSAT],
        'ACC_IMPL.PORTFOLIO_TRANSFER_DOCUMENT_PAYMENT_SAT': paymentsSAT,
    };
};
