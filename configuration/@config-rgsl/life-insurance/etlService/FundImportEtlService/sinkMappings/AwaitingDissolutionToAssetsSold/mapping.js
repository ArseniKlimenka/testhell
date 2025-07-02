module.exports = function mapping(input, sinkExchange) {
    if (!sinkExchange.globalContext.amendmentNumber) {
        return;
    }

    const result = {
        businessNumber: sinkExchange.globalContext.amendmentNumber,
        transition: {
            transitionName: "AwaitingDissolution_to_AssetsSold",
            configurationName: sinkExchange.globalContext.amendmentConfigurationCodeName,
            configurationVersion: "1"
        }
    };

    return result;
};
