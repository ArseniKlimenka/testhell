module.exports = function mapping(sinkInput, sinkExchange) {

    const result = {
        businessNumber: sinkInput.number,
    };

    return result;
};
