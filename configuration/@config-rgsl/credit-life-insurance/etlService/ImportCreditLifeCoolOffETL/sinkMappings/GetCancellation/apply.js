module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const contractVersions = sinkResult.data && sinkResult.data.map(item => item.resultData) || [];
    const cancellationBody = contractVersions[0].body;
    sinkExchange.cancellationBody = cancellationBody;

    const paymentLines = cancellationBody?.paymentAmendmentConditions?.paymentLines || [];
    const paymentLinesSum = paymentLines.reduce((acc, elem) => acc += elem.paymentLineSum, 0);
    if (paymentLinesSum <= 0) {
        throw 'Отсутствует сумма к выплате';
    }

};
