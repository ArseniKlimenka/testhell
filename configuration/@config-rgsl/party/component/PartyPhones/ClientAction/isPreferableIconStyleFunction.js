'use strict';

module.exports = function isPreferableIconStyleFunction(input, ambientProperties) {

    if (input.data.isPreferable) {
        return {
            "name": "check-circle",
            "size": "Medium",
            "color": "Success"
        };
    }

};
