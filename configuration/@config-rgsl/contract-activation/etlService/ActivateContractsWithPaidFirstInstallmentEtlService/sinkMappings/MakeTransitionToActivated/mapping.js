module.exports = function mapping(lineInput, sinkExchange) {
    const result = {
        businessNumber: lineInput.contractNo,
        transition: {
            transitionName: "Active_to_Activated",
            configurationName: lineInput.configurationName,
            configurationVersion: lineInput.configurationVersion
        }
    };

    return result;
};
