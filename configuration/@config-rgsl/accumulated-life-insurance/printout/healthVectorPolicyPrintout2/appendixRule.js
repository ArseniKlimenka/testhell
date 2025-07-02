const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function appendixRule(input) {

    const appendix = [];
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    const additionalServices = getValue(input, 'body.additionalServices', []);

    // Мед. услуги
    appendix.push({
        name: `CommonAppendixImageContainer/img/healthVector2024.pdf`,
        mode: 'Append'
    });

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

    // TAX1+MED72
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction12") && additionalServices.some(item => item.serviceCode == "MED722"))
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
