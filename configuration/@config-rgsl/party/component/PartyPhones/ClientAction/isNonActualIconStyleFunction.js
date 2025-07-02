'use strict';

module.exports = function isNonActualIconStyleFunction(input, ambientProperties) {

    if (input.data.isNonActual) {
        return {
            "name": "check-circle",
            "size": "Medium",
            "color": "Danger"
        };
    }

};
