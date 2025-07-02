'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    // TaxDeduction налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction3"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction3.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction8 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction8"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction8.pdf`,
    //     mode: 'Append'
    // }); }

    // TAX1 налоговый вычет
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
        if (printoutsHelper.checkTaxDeductionConditions(issueDate, productCode)) {
            appendix.push({
                name: `CommonAppendixImageContainer/img/Tax1_28_02_2025.pdf`,
                mode: 'Append'
            });
        } else {
            appendix.push({
                name: `CommonAppendixImageContainer/img/Tax1.pdf`,
                mode: 'Append'
            });
        }
    }

    // TaxDeduction2
    //  Печатка: Финансовый помощник
    if (additionalServices.some(item => item.serviceCode == "TaxDeduction2")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/TaxDeduction101.pdf`,
            mode: 'Append'
        });
    }


    // FIN4 Финансовый чекап
    if (additionalServices.some(item => item.serviceCode == "FIN4"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/FIN4.pdf`,
        mode: 'Append'
    }); }

    // Мульисервис
    if (additionalServices.some(item => item.serviceCode == "TAX2") || additionalServices.some(item => item.serviceCode == "LEG15") || additionalServices.some(item => item.serviceCode == "MED98")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/multiservice.pdf`,
            mode: 'Append'
        });
    }

    // ПРО Здоровье, ПРО ЗОЖ, ПРО Генетику
    printoutsHelper.setGiftServiceMemoRule(appendix, additionalServices, input);

    return appendix;
};
