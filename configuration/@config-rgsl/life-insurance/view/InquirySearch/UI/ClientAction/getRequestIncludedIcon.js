'use strict';

module.exports = function getRequestIncludedIcon(input) {

    const requestIncludedInRussianPostRegister = input.data.requestIncludedInRussianPostRegister;

    if (requestIncludedInRussianPostRegister) {

        return {
            "name": "Check",
            "size": "Medium",
            "color": "Success"
        };
    }


    return {
        "name": "Times",
        "size": "Medium",
        "color": "Danger"
    };

};
