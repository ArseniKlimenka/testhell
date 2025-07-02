module.exports = function resultMapping(input) {

    if (input.length != 1) {
        throw 'Should be only one line!';
    }

    const item = input[0];

    return {
        lastExecutionDate: item.LAST_EXECUTION_DATE,
    };
};
