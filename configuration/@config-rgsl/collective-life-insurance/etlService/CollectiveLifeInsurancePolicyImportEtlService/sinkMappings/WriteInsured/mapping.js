'use strict';

const { generate } = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { maleGender } = require('@config-rgsl/collective-life-insurance/lib/CollectivePolicyConsts');

module.exports = function mapping(input) {

    const insured = {
        contractNumber: this.businessContext.etlServiceInput.contractNumber,
        surName: getValue(input, 'data.surName'),
        firstName: getValue(input, 'data.firstName'),
        middleName: getValue(input, 'data.middleName'),
        birthDay: getValue(input, 'data.birthDay'),
        gender: getGender(input),
        mobile: getValue(input, 'data.mobile'),
        amount: getValue(input, 'data.amount'),
        premium: getValue(input, 'data.premium')
    };

    const output = {
        request: insured
    };

    return output;
};

function getGender(input) {

    const gender = getValue(input, 'data.gender').toLowerCase();
    return maleGender.includes(gender) ? 1 : 0;
}
