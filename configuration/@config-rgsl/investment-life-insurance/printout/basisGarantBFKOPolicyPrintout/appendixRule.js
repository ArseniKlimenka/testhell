const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function appendixRule(input) {

    const appendix = [];
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;
    const isReminderPayment = productGroupArray.REMINDER_PAYMENT_IBGOAS.includes(productCode);

    const additionalServices = getValue(input, 'body.additionalServices', []);

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

    // Мульисервис
    if (additionalServices.some(item => item.serviceCode == "TAX2") || additionalServices.some(item => item.serviceCode == "LEG15") || additionalServices.some(item => item.serviceCode == "MED98")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/multiservice.pdf`,
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

    // Памятка по оплате
    if (isReminderPayment) {
        appendix.push({
            name: `InvestmentAppendixImageContainer/img/reminderPayment.pdf`,
            mode: 'Append'
        });
    }

    return appendix;

};
