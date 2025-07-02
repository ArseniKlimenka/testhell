'use strict';

module.exports = function mapping(input) {

    return {
        contractNumbers: input.contractNumbers,
        postingDateTo: input.postingDateTo,
        postingDescription: input.postingDescription
    };
};
