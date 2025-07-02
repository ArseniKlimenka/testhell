module.exports = function mapping(input, sinkExchange) {

    return {
        businessNumber: input.currentPONumber
    };
};
