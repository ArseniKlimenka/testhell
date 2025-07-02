module.exports = function mapping(sinkInput) {

    return {
        bankStatementItems: sinkInput.resultData,
    };
};
