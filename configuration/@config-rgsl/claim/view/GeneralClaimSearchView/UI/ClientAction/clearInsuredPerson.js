'use strict';

module.exports = function clearInsuredPerson(input) {

    if (input.context.request.data.criteria.insuredPersonCode) {

        input.context.request.data.criteria.insuredPersonCode = undefined;
        input.context.request.data.criteria.insuredPersonFullName = undefined;
    }
};
