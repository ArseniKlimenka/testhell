'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            ...input.data.criteria
        }
    };

    return output;
};
