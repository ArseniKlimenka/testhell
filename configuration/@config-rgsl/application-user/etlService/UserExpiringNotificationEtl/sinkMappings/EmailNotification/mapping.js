'use strict';

module.exports = function mapping(input) {

    return {
        recipients: {
            contactInformation: [input.email],
        },
        dataContext: {
            expireDate: input.expireDate,
            username: input.username,
        },
    };
};
