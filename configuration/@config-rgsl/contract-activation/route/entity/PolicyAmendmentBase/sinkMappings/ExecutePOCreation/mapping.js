'use static';

module.exports = function mapping(input) {

    if (input.state === 'POCreation') {
        return {
            amendmentNumber: input.number,
        };
    }
};
