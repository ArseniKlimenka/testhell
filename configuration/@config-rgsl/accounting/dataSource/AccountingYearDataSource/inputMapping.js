'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.year = null;
    output.parameters.years = null;
    output.parameters.fromYear = null;
    output.parameters.toYear = null;

    if (input.data.criteria.year) {

        output.parameters.year = input.data.criteria.year;
    }

    if (input.data.criteria.years) {

        output.parameters.years = input.data.criteria.years;
    }

    if (input.data.criteria.fromYear) {

        output.parameters.fromYear = input.data.criteria.fromYear;
    }

    if (input.data.criteria.toYear) {

        output.parameters.toYear = input.data.criteria.toYear;
    }

    return output;
};
