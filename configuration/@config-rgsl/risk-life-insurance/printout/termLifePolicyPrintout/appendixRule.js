'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);

    // TaxDeduction3 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction3"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction3.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction4 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction4"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction4.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction6 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction6"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction6.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction8 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction8"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction8.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction8 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction10"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction10.pdf`,
    //     mode: 'Append'
    // }); }

    // TAX1 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TAX1"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction8.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction11 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction11"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction11.pdf`,
    //     mode: 'Append'
    // }); }

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

    // ПФП2
    // if (additionalServices.some(item => item.serviceCode == "PFP2"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/memoPFP2.pdf`,
    //     mode: 'Append'
    // }); }

    // if (additionalServices.some(item => item.serviceCode == "PFP3"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/memoPFP2.pdf`,
    //     mode: 'Append'
    // }); }


    // TaxDeduction14
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction14"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction11.pdf`,
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


    // Памятка УУ
    appendix.push({
        name: `CommonAppendixImageContainer/img/memoUUTerm.pdf`,
        mode: 'Append'
    });

    // ПРО Здоровье, ПРО ЗОЖ, ПРО Генетику
    printoutsHelper.setGiftServiceMemoRule(appendix, additionalServices, input);

    return appendix;
};
