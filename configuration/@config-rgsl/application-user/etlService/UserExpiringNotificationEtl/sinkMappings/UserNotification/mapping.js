'use strict';

module.exports = function mapping(input) {

    return {
        recipients: {
            userIds: [input.applicationUserId]
        },
        dataContext: {
            expireDate: input.expireDate,
        },
        options: {
            endTime: input.expireDate,
        },
        priority: 'High',
    };
};
