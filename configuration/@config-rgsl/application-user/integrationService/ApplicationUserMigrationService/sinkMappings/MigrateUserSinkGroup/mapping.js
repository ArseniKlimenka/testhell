module.exports = function mapping(input, sinkExchange) {

    return {
        username: input.username,
        password: input.password,
    };
};
