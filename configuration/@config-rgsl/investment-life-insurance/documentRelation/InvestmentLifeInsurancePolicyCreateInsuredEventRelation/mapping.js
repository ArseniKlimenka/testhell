'use strict';

module.exports = function mapping(body) {

    const insuredEventBody = {
        contract: {
            number: this.businessContext.documentNumber,
            configurationName: this.businessContext.configurationCodeName
        },
        fixedExchangeRate: body.basicConditions.exchangeRate,
        useFixedExchangeRate: !!body.basicConditions.exchangeRate
    };

    return { body: insuredEventBody };
};
