'use strict';

module.exports = function getIsFutureContractIcon(input) {

    if (input.data.isFutureContract) {

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
