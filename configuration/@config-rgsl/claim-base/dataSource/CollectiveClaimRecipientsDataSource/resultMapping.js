'use strict';

module.exports = function resultMapping(input) {

    return {
        fullName: input.FULL_NAME,
        birthDate: input.BIRTH_DATE,
        amount: input.AMOUNT,
        franchise: input.FRANCHISE,
        totalAmount: input.TOTAL_AMOUNT,
        serviceDescription: input.SERVICE_DESCRIPTION,
        serviceProviderName: input.SERV_PROVIDER_NAME
    };
};
