'use strict';

module.exports = function apply(sinkResult, lineInput, sinkExchange) {

    const contractNumbers = sinkResult.data.map(_ => _.resultData);

    sinkExchange.paymentOrderContractNumber = contractNumbers[0]?.referenceNo;
};
