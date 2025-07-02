module.exports = function mapping(lineInput, sinkExchange) {
    const result = {
        businessNumber: lineInput.contractNo,
        transition: {
            transitionName: "Activated_to_Completed",
            configurationName: lineInput.configurationName,
            configurationVersion: lineInput.configurationVersion
        }
    };

    return result;
};
