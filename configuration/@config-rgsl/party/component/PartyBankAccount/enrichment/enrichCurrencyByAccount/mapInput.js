module.exports = function mapping(input) {

    if (input.number && input.number.length === 20) {
        return {
            data: {
                criteria: {}
            }
        };
    }

    return;

};
