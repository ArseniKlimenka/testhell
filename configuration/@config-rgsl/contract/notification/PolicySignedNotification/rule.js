'use strict';

const { businessRules } = require('@adinsure/runtime');
const { giftServices } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function rule(input) {

    const parsedInput = JSON.parse(input);


    let productCode;
    let issueDate;
    let additionalServices;
    if (parsedInput.productCode) {
        productCode = parsedInput.productCode;
        issueDate = parsedInput.issueDate;
        additionalServices = parsedInput.additionalServices;
    }
    else {
        productCode = parsedInput.content.sinkOutput.productCode;
        issueDate = parsedInput.content.sinkOutput.issueDate;
        additionalServices = parsedInput.content.sinkOutput.additionalServices;
    }


    const isNewForm = productGroupArray.EPOLICY_SEND_NEW_SMS_EMAIL.includes(productCode);


    let items = [];
    if (isNewForm) {
        items = [
            {
                staticAsset: {
                    name: 'Logo.png'
                }
            },
            {
                staticAsset: {
                    name: 'leg_doc.png'
                }
            }
        ];
    }
    else {
        items = [
            {
                staticAsset: {
                    name: 'Logo.png'
                }
            },
            {
                staticAsset: {
                    name: 'Mail.png'
                }
            },
            {
                staticAsset: {
                    name: 'Smartphone.png'
                }
            }
        ];
    }

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;

    if (conf.ConsentEDI) {

        items.push({ staticAsset: { name: 'Соглашение об ЭДО.pdf' } });
    }

    // Add printout to \life-insurance\printouts for new PDF file
    // Check attachmentTypes in \SendContractInfoEmailSinkGroup\sinkMappings\CreateServicesMemoPrintoutFile\mapping.js
    if (conf.ServicesMemo && conf.ServiceMemoFIleName) {

        if (conf.ServiceMemoFIleName.includes('TaxDeduction'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeductionPrintout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TaxDeduction2'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeduction2Printout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TaxDeduction3'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeduction3Printout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TaxDeduction6'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeduction6Printout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TaxDeduction7'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeduction7Printout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TaxDeduction8'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeduction8Printout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TaxDeduction9'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeduction9Printout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TaxDeduction11'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TaxDeduction11Printout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('MedNavigator'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.MedNavigatorPrintout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('memoPFP'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.memoPFPPrintout}.pdf` } }); }

        if (conf.ServiceMemoFIleName.includes('TAX1')) {
            if (printoutsHelper.checkTaxDeductionConditions(issueDate, productCode)) {
                items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TAX1Printout28_02_2025}.pdf` } });
            } else {
                items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.TAX1Printout}.pdf` } });
            }
        }

        if (conf.ServiceMemoFIleName.includes('TAX2'))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.MultiservicePrintout}.pdf` } }); }

    }

    // Add printout to \life-insurance\printouts for new PDF file
    // Check attachmentTypes in \SendContractInfoEmailSinkGroup\sinkMappings\CreateServicesMemoPrintoutFile\mapping.js
    if (additionalServices && additionalServices.length > 0) {

        if (additionalServices.includes(giftServices.MED85))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.ProHealthPrintout}.pdf` } }); }

        if (additionalServices.includes(giftServices.MED86))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.ProHealthyLifestylePrintout}.pdf` } }); }

        if (additionalServices.includes(giftServices.MED87) && additionalServices.includes(giftServices.MED88) && additionalServices.includes(giftServices.MED89))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.ProGeneticsPrintout}.pdf` } }); }

        if (additionalServices.includes(giftServices.MED96))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.memoGeneticsPowerPrintout}.pdf` } }); }

        if (additionalServices.includes(giftServices.MED97))
        { items.push({ staticAsset: { name: `${printoutsConstant.printoutMemoName.memoHealthLifestylePrintout}.pdf` } }); }

    }

    return items;
};
