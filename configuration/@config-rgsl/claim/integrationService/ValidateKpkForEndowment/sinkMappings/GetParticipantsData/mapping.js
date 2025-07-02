'use strict';

module.exports = function (input, sinkExchange) {

    const holder = sinkExchange.policyParties.holder;
    const insured = sinkExchange.policyParties.insuredPerson;
    const beneficiaryCodes = input.beneficiaryCodes ?? [];

    let partyCodes = [];
    partyCodes.push(holder.personCode);
    partyCodes.push(insured.personCode);
    partyCodes.push(...beneficiaryCodes);
    partyCodes = [...new Set(partyCodes)];

    return {
        input: {
            data: {
                criteria: {
                    partyCodes: partyCodes,
                }
            }
        }
    };
};
