const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);

    // FIN2+MED72
    if (additionalServices.some(item => item.serviceCode == "FIN2") && additionalServices.some(item => item.serviceCode == "MED72"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoFIN2MED72.pdf`,
        mode: 'Append'
    }); }

    // TAX1+MED72
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction10") && additionalServices.some(item => item.serviceCode == "MED721"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/memoTAX1MED72.pdf`,
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


    return appendix;
};
