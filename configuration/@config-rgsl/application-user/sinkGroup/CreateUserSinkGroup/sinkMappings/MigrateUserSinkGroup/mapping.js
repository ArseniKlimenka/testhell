module.exports = function mapping(input, sinkExchange) {

    return {
        username: input.adInsureUser.Username,
        password: input.adInsureUser.Password,
    };
};
