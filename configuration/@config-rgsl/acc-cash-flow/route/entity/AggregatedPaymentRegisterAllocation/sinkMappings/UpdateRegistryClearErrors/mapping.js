'use static';

module.exports = function mapping({id, number, state, body}, sinkExchange) {
    body.errors = [];

    const result = {
        body: body,
        number: number
    };

    return result;
};
