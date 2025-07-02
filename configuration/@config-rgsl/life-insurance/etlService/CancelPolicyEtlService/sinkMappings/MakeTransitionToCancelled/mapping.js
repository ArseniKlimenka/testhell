module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.canCreateCancellation) {

        return null;
    }

    if (!sinkExchange.childDocument) {

        return null;
    }

    const result = {
        businessNumber: sinkExchange.childDocument.contractNumber,
        transition: {
            transitionName: `${sinkExchange.childDocument.stateCode}_to_Cancelled`,
            configurationName: sinkExchange.childDocument.configurationName,
            configurationVersion: "1"
        }
    };

    return result;
};
