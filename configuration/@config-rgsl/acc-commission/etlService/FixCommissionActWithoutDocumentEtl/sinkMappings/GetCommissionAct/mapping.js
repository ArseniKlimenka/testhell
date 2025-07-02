module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    actId: input.actId,
                }
            }
        }
    };
};
