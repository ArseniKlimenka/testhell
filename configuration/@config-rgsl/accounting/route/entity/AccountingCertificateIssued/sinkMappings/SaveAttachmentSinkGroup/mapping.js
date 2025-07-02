'use static';

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        documentId: sinkInput.id,
        number: sinkInput.number,
        state: sinkInput.state,
        body: sinkInput.body
    };
};
