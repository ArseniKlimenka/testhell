module.exports = function mapping(input, sinkExchange) {

    const request = {
        actNo: input.number,
        newState: input.state,
    };

    return {
        request,
    };
};
