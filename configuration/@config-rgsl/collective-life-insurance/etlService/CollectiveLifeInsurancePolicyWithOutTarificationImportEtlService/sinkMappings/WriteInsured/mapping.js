'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { maleGender } = require('@config-rgsl/collective-life-insurance/lib/CollectivePolicyConsts');

module.exports = function mapping(input, sinkExchange) {

    setCommission(input, sinkExchange);

    const insured = {
        contractNumber: this.businessContext.etlServiceInput.contractNumber,
        surName: getValue(input, 'data.surName'),
        firstName: getValue(input, 'data.firstName'),
        middleName: getValue(input, 'data.middleName'),
        birthDay: getValue(input, 'data.birthDay'),
        gender: getGender(input),
        mobile: getValue(input, 'data.mobile'),
        amount: getValue(input, 'data.amount'),
        premium: getValue(input, 'data.premium'),
        reinsurerCode: getValue(input, 'data.reinsurerCode'),
        reinsurerName: getValue(sinkExchange, 'reinsurerName'),
        reinsurerShare: getValue(input, 'data.reinsurerShare')
    };

    const output = {
        request: insured
    };

    return output;
};

function setCommission(input, context) {

    if (!context.globalContext.commission) {

        context.globalContext.commission = getValue(input, 'data.commission');
    }

    if (!context.globalContext.manualExpenses) {

        context.globalContext.manualExpenses = getValue(input, 'data.manualExpenses');
    }

    if (!context.globalContext.manualCommissionNP) {

        context.globalContext.manualCommissionNP = getValue(input, 'data.manualCommissionNP');
    }

    if (!context.globalContext.manualCommissionSP) {

        context.globalContext.manualCommissionSP = getValue(input, 'data.manualCommissionSP');
    }
}

function getGender(input) {

    const gender = getValue(input, 'data.gender').toLowerCase();
    return maleGender.includes(gender) ? 1 : 0;
}
