'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const OASpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '247457';
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;


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

    if (OASpartner) {
        const isReminderPaymentEBMOASAfter202501 = productGroupArray.REMINDER_PAYMENT_EBMOAS.includes(input.body.mainInsuranceConditions?.insuranceProduct?.productCode);

        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/MemoInsuredEventOAS_ver2.pdf`,
            mode: 'Append'
        });
        appendix.push({
            name: `${isReminderPaymentEBMOASAfter202501 ? `AccumulatedAppendixImageContainer/img/reminderPaymentWCENOASandCAPCandEBMOAS.pdf` : `AccumulatedAppendixImageContainer/img/reminderPayment.pdf`}`,
            mode: 'Append'
        });
    }

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

    // TAX1 налоговый вычет
    // if (additionalServices.some(item => item.serviceCode == "TAX1"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/Tax1.pdf`,
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

    // FIN4
    if (additionalServices.some(item => item.serviceCode == "FIN4"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/FIN4.pdf`,
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
    //     name: `CommonAppendixImageContainer/img/TaxDeduction111.pdf`,
    //     mode: 'Append'
    // }); }

    // TaxDeduction101 ВАШ ФИНАНСОВЫЙ ПОМОЩНИК
    // if (additionalServices.some(item => item.serviceCode == "TaxDeduction101"))
    // { appendix.push({
    //     name: `CommonAppendixImageContainer/img/TaxDeduction101.pdf`,
    //     mode: 'Append'
    // }); }

    if (additionalServices.some(item => item.serviceCode == "MED88") && additionalServices.some(item => item.serviceCode == "MED89"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoGenCheck.pdf`,
        mode: 'Append'
    }); }

    if (additionalServices.some(item => item.serviceCode == "EDU5") && additionalServices.some(item => item.serviceCode == "EDU6") && additionalServices.some(item => item.serviceCode == "EDU7") && additionalServices.some(item => item.serviceCode == "EDU8"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoEducation.pdf`,
        mode: 'Append'
    }); }

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


    // ПРО Здоровье, ПРО ЗОЖ, ПРО Генетику
    printoutsHelper.setGiftServiceMemoRule(appendix, additionalServices, input);

    return appendix;
};
