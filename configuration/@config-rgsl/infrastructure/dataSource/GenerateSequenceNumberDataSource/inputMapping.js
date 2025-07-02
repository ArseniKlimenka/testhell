module.exports = function (input) {

    return {
        request: {
            SequenceName: input.data.sequenceName
        }
    };
};
