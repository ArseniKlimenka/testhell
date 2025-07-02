'use static';

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocument
}, sinkExchange) {

    return {
        claimNumber: number
    };
};
