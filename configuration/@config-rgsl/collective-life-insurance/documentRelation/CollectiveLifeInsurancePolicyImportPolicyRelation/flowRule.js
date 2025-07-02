'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function rule({ body, commonBody }) {

    return getValue(body, 'basicConditions.withTarification', false) == true;
};
