module.exports = function getnext(input) {

    // if number is already exists then do nothing
    if (input.number) {
        return {
            number: input.number
        };
    }

    const originalNumber = input.metadata?.originalNumber;
    const sequenceNumber = input.sequenceNumber;

    return {
        number: originalNumber + '/' + sequenceNumber,
    };
};
