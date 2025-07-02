'use strict';

const { insuredEventType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showDaysWithoutWork(input) {

    const insuredEvent = input.data.insuredEventType;
    return insuredEvent?.code == insuredEventType.unemployment.code;
};
