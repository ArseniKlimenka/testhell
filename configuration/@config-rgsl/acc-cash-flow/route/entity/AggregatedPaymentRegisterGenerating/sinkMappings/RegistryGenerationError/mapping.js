module.exports = function mapping({message, input}, sinkExchange) {
    return {
        businessNumber: input.number,
    };
};
