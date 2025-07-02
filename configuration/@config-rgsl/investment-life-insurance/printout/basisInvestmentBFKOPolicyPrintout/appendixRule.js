const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);

    // заявление на выплату ДИД
    appendix.push({
        name: `InvestmentAppendixImageContainer/img/applicationCouponDID.pdf`,
        mode: 'Append'
    });

    // приложение к заявлению на выплату ДИД
    // disabled according to ADIRGSL-1314
    /*
    appendix.push({
        name: `InvestmentAppendixImageContainer/img/applicationCouponDIDAnnex.pdf`,
        mode: 'Append'
    });
    */

    // TaxDeduction
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction7
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction7"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction7.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction11
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction11"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction11.pdf`,
    //     mode: 'Append'
    // }); }

    // TAX1
    // if (additionalServices.some(item => item.serviceCode == "TAX1"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/Tax1.pdf`,
    //     mode: 'Append'
    // }); }

    // Taxdeductions
    // TaxDeduction14
    // Печатка: Личный помощник
    if (additionalServices.some(item => item.serviceCode == "TaxDeduction14") || additionalServices.some(item => item.serviceCode == "TaxDeduction10")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/TaxDeduction111.pdf`,
            mode: 'Append'
        });
    }

    // Tax1
    //  Печатка: Налоговый вычет
    if (additionalServices.some(item => item.serviceCode == "TAX1")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/Tax1.pdf`,
            mode: 'Append'
        });
    }

    // TaxDeduction2
    //  Печатка: Финансовый помощник
    if (additionalServices.some(item => item.serviceCode == "TaxDeduction2")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/TaxDeduction101.pdf`,
            mode: 'Append'
        });
    }


    // ПФП
    if (additionalServices.some(item => item.serviceCode == "PFP"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoPFP.pdf`,
        mode: 'Append'
    }); }

    // FIN3
    if (additionalServices.some(item => item.serviceCode == "FIN3"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoFIN3.pdf`,
        mode: 'Append'
    }); }

    return appendix;
};
