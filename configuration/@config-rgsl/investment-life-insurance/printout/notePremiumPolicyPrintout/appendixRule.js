const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);

    // заявление на выплату ДИД
    appendix.push({
        name: `InvestmentAppendixImageContainer/img/applicationCouponDID.pdf`,
        mode: 'Append'
    });

    /*
    // приложение к заявлению на выплату ДИД
    appendix.push({
        name: `InvestmentAppendixImageContainer/img/applicationCouponDIDAnnex.pdf`,
        mode: 'Append'
    });
    */

    // ПФП
    if (additionalServices.some(item => item.serviceCode == "PFP"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoPFP.pdf`,
        mode: 'Append'
    }); }


    return appendix;

};
