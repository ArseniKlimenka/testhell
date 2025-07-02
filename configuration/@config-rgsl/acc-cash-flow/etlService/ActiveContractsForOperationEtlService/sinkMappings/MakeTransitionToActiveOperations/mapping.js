module.exports = function mapping(lineInput, sinkExchange) {
    const result = {
        businessNumber: lineInput.contractNo,
        transition: {
            transitionName: "Draft_to_Active_Operations",
            configurationName: lineInput.configurationName,
            configurationVersion: lineInput.configurationVersion
        }
    };

    return result;
};
