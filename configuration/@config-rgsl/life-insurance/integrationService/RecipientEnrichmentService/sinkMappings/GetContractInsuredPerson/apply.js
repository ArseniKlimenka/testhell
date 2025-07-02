module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const resultData = sinkResult.data[0]?.resultData;
    if (!resultData) {
        return;
    }

    sinkExchange.insuredPerson = {
        fullName: resultData.parties?.insuredPerson?.fullName,
        personCode: resultData.parties?.insuredPerson?.personCode
    };
};
