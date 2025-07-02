'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    // ПФП
    if (additionalServices.some(item => item.serviceCode == "PFP"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoPFP.pdf`,
        mode: 'Append'
    }); }

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

    // Мульисервис
    if (additionalServices.some(item => item.serviceCode == "TAX2") || additionalServices.some(item => item.serviceCode == "LEG15") || additionalServices.some(item => item.serviceCode == "MED98")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/multiservice.pdf`,
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


    // FIN3
    if (additionalServices.some(item => item.serviceCode == "FIN3"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoFIN3.pdf`,
        mode: 'Append'
    }); }


    // FIN5
    if (additionalServices.some(item => item.serviceCode == "FIN5")) {
        if (printoutsHelper.checkTaxDeductionConditions(issueDate, productCode)) {
            appendix.push({
                name: `CommonAppendixImageContainer/img/FIN5_SINCE_2025_02_15.pdf`,
                mode: 'Append'
            });
        } else {
            appendix.push({
                name: `CommonAppendixImageContainer/img/FIN5.pdf`,
                mode: 'Append'
            });
        }
    }

    // ПРО Здоровье, ПРО ЗОЖ, ПРО Генетику
    printoutsHelper.setGiftServiceMemoRule(appendix, additionalServices, input);

    return appendix;
};
