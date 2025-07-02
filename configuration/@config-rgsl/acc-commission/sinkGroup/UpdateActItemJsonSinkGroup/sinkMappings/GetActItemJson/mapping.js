module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    actNo: input.actNo,
                    actItemIds: input.actItemIds,
                }
            }
        }
    };
};
