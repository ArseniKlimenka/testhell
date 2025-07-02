const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    // TaxDeduction5 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction5"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction5.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction9 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction9"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction9.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction16 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction16"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction9.pdf`,
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


    // Образовательный Консьерж
    if (additionalServices.some(item => item.serviceCode == "EduConcierge"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/EduConcierge.pdf`,
        mode: 'Append'
    }); }

    // Памятка по страховому случаю
    appendix.push({
        name: `AccumulatedAppendixImageContainer/img/memoInsuredEventCAPC_ver2.pdf`,
        mode: 'Append'
    });
    // Памятка по оплате
    appendix.push({
        name: `AccumulatedAppendixImageContainer/img/reminderPaymentWCENOASandCAPCandEBMOAS.pdf`,
        mode: 'Append'
    });

    // Образовательный Консьерж 2
    if (additionalServices.some(item => item.serviceCode == "EduConcierge2"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/EduConcierge2.pdf`,
        mode: 'Append'
    }); }

    // Образовательный Консьерж 2
    if (additionalServices.some(item => item.serviceCode == "EduConcierge3"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/EduConcierge2.pdf`,
        mode: 'Append'
    }); }

    if (additionalServices.some(item => item.serviceCode == "EDU5") && additionalServices.some(item => item.serviceCode == "EDU6") && additionalServices.some(item => item.serviceCode == "EDU7") && additionalServices.some(item => item.serviceCode == "EDU8")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/memoEducation.pdf`,
            mode: 'Append'
        });
    }

    return appendix;
};
