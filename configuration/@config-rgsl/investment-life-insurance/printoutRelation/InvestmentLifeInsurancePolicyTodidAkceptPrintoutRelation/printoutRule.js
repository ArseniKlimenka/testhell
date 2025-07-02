'use strict';

module.exports = function rule(input) {

    const akceptPartner = input.body.mainInsuranceConditions?.partner?.partnerBusinessCode == '431120';

    if (akceptPartner) {

        return true;
    }
};
