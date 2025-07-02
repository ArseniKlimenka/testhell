'use strict';

module.exports = function mapping(lineInput) {

    return {
        username: lineInput.data.userName,
        throwIfNotFound: true
    };
};
