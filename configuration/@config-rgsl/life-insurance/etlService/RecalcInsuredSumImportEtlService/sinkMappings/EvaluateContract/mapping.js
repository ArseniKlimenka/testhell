module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            Number: input.data.contractNumber
        }
    };

};
