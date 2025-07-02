'use strict';

module.exports = function lockInsuredPersonData(input, ambientProperties) {

    return input.componentContext.isTaxPayerInsuredPerson;
};
