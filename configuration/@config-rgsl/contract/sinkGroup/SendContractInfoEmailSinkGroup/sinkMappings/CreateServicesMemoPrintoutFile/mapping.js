'use strict';

const { giftServices } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');

    if (!isEPolicy) {

        return;
    }

    const servicesMemoAttachmentIds = sinkExchange.resolveContext('servicesMemoAttachmentIds');
    const contractId = sinkExchange.resolveContext('contractId');

    if (servicesMemoAttachmentIds && servicesMemoAttachmentIds.length > 0) {

        return;
    }

    const additionalServices = sinkExchange.resolveContext('additionalServices') ?? [];
    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');

    const printoutRelations = additionalServices.map(item => {

        if (item.serviceCode.includes('TaxDeduction') || item.serviceCode.includes('TAX1') || item.serviceCode.includes('MedNavigator') || item.serviceCode.includes('memoPFP')) {

            const info = printoutsinfo.find(p => p.PrintoutName === `${item.serviceCode}Printout`);

            return {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            };

        }
        else if (item.serviceCode.includes(giftServices.MED85)) {

            const info = printoutsinfo.find(p => p.PrintoutName === `ProHealthPrintout`);

            return {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            };
        }
        else if (item.serviceCode.includes('TAX2')) {
            const info = printoutsinfo.find(p => p.PrintoutName === 'MultiservicePrintout');

            return {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            };
        }
        else if (item.serviceCode.includes(giftServices.MED86)) {

            const info = printoutsinfo.find(p => p.PrintoutName === `ProHealthyLifestylePrintout`);

            return {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            };
        }
        else if (item.serviceCode.includes(giftServices.MED87) ||
            item.serviceCode.includes(giftServices.MED88) ||
            item.serviceCode.includes(giftServices.MED89)) {

            const info = printoutsinfo.find(p => p.PrintoutName === `ProGeneticsPrintout`);

            return {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            };
        }
        else if (item.serviceCode.includes(giftServices.MED96)) {

            const info = printoutsinfo.find(p => p.PrintoutName === `memoGeneticsPowerPrintout`);

            return {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            };
        }
        else if (item.serviceCode.includes(giftServices.MED97)) {

            const info = printoutsinfo.find(p => p.PrintoutName === `memoHealthLifestylePrintout`);

            return {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            };
        }
    }).filter(i => i);

    if (printoutRelations.length == 0) {

        return;
    }

    return {
        printoutRelations: printoutRelations,
        entity: {
            id: contractId
        }
    };
};
