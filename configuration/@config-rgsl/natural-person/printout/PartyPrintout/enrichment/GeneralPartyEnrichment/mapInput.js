'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const username = this.applicationContext.user.username;

    const output = {
        data: {
            criteria: {
                username: username,
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };

    return output;
};
