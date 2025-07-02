const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const isERCP2 = input.body?.mainInsuranceConditions?.insuranceProduct?.productCode == 'ERCP2';
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    // ПФП
    if (additionalServices.some(item => item.serviceCode == "PFP"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoPFP.pdf`,
        mode: 'Append'
    }); }

    // ТЕЛЕМЕДИЦИНА расширенная
    if (additionalServices.some(item => item.serviceCode == "TMExtended"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoTMExtended.pdf`,
        mode: 'Append'
    }); }

    // ТЕЛЕМЕДИЦИНА базовая
    if (additionalServices.some(item => item.serviceCode == "TMBase"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoTMBase.pdf`,
        mode: 'Append'
    }); }

    // ТЕЛЕМЕДИЦИНА расширенная 2
    // if (additionalServices.some(item => item.serviceCode == "TMExtended2"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/memoTMExtended2.pdf`,
    //     mode: 'Append'
    // }); }

    // ТЕЛЕМЕДИЦИНА базовая 2
    // if (additionalServices.some(item => item.serviceCode == "TMBase2"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/memoTMBase2.pdf`,
    //     mode: 'Append'
    // }); }

    // FIN2+MED72
    if (additionalServices.some(item => item.serviceCode == "FIN2") && additionalServices.some(item => item.serviceCode == "MED72"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoFIN2MED72.pdf`,
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

    // TAX1+MED72
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction10") && additionalServices.some(item => item.serviceCode == "MED721"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/memoTAX1MED72.pdf`,
    //     mode: 'Append'
    // }); }


    // TaxDeduction10
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction10"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction10.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction14
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction14") && !(isERCP2))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction10.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction111 Ваш Личный помощник
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction111"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction111.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction14
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction14"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction111.pdf`,
    //     mode: 'Append'
    // }); }

    // TAX1+MED72
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction14") && additionalServices.some(item => item.serviceCode == "MED721"))
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

    // Мульисервис
    if (additionalServices.some(item => item.serviceCode == "TAX2") || additionalServices.some(item => item.serviceCode == "LEG15") || additionalServices.some(item => item.serviceCode == "MED98")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/multiservice.pdf`,
            mode: 'Append'
        });
    }

    return appendix;

};
