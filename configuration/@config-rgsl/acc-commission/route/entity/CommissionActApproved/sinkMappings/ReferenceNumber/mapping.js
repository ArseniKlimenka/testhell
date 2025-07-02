const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function policyMapping(input, sinkExchange) {
    const act = sinkExchange.resolveContext('act');

    if (act.commAmountLc < 0) {
        return {
            'ACC_IMPL.REFERENCE_NUMBER': [
                {
                    REFERENCE_NO: input.number, // has to be unique
                    DOCUMENT_NO: input.number,
                    CURRENCY_CODE: 'RUB',
                    DOCUMENT_TYPE_ID: allocationDocumentType.COMMISSION_ACT,
                }
            ],
        };
    }
};
