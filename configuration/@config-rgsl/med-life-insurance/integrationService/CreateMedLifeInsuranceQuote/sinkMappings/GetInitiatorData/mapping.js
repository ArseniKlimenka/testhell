'use strict';

module.exports = function mapInput(input) {

    if (this.applicationContext.originatingUser.id) {

        return {
            input: {
                data: {
                    criteria: {
                        userId: this.applicationContext.originatingUser.id
                    }
                }
            }
        };

    }

    return null;
};
