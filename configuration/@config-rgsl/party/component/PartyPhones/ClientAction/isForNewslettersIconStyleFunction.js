'use strict';

module.exports = function isForNewslettersIconStyleFunction(input, ambientProperties) {

    if (input.data.isForNewsletters) {
        return {
            "name": "check-circle",
            "size": "Medium",
            "color": "Success"
        };
    }

};
