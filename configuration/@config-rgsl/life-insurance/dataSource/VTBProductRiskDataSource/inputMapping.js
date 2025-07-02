'use strict';

module.exports = function (input) {

    if (!input.data?.criteria) {
        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;

};
