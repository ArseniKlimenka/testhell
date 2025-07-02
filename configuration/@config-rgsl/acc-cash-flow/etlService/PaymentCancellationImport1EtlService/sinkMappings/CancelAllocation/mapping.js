module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            allocationIds: [input.allocationId],
        }
    };
};
