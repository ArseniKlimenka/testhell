module.exports = function mapping(input, sinkExchange) {

    const result = {
        businessNumber: input.number,
        transition: {
            configurationName: input.configurationCodeName,
            configurationVersion: input.configurationVersion,
        },
    };

    return result;
};
