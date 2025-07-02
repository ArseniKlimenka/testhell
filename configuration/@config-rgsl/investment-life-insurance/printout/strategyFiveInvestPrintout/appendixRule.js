'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);

    // TaxDeduction6
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction6"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction6.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction8
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction8"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction8.pdf`,
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


    // ПРО Здоровье, ПРО ЗОЖ, ПРО Генетику
    printoutsHelper.setGiftServiceMemoRule(appendix, additionalServices, input);

    return appendix;

};
