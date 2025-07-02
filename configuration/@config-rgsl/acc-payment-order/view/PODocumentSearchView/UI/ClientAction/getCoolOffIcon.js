'use strict';

module.exports = function getCoolOffIcon(input) {

    const isCoolOffPeriod = input.data.isCoolOffPeriod;

    if (isCoolOffPeriod) {

        return {
            "name": "Check",
            "size": "Medium",
            "color": "Secondary"
        };
    }


    return {
        "name": "Times",
        "size": "Medium",
        "color": "Secondary"
    };

};
