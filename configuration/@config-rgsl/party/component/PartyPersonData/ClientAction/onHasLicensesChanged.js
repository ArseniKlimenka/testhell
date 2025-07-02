"use strict";

module.exports = function onHasLicensesChanged(input, ambientProperties) {

    if (input.data.partyLicenses) {
        input.data.partyLicenses = [];
    }
};
