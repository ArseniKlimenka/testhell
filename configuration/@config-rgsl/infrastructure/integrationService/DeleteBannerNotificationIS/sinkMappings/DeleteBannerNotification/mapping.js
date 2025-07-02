module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            notificationId: input.notificationId,
            requestingUserId: input.requestingUserId
        }
    };
};
