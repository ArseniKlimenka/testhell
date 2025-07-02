'use strict';

module.exports = function mapping(input) {

    const userId = input.body.initiator.userId;

    if (userId) {

        return {
            input: {
                data: {
                    criteria: {
                        userId: userId
                    }
                }
            }
        };

    }

    return null;
};
