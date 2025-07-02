const { salesSegment, policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { translationUtils } = require('@adinsure/runtime');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {

        let salesSegmentData = '';
        if (item.resultData.productCode && item.resultData.issueDate) {

            const salesSegmentCode = item.resultData.productSalesSegment;
            salesSegmentData = salesSegment[salesSegmentCode] && salesSegment[salesSegmentCode].desc || '';
        }

        const rate = item.resultData.manualRate || item.resultData.calculatedRate || 0;
        const riskPremium = item.resultData.riskPremium ?? 0;

        let commisionWithoutNDS = 0;
        let commisionWithNDS = 0;

        if (rate && riskPremium) {
            commisionWithoutNDS = round(rate * riskPremium, 2);
            commisionWithNDS = round(commisionWithoutNDS * 1.2, 2);
        }
        return {
            "id": item.resultData.id,
            "stateCodeDescription": item.resultData.stateCode ?
                translationUtils.getTranslation('dataSource/GeneralContractSearchDataSource/1', 'enum', 'contractState', item.resultData.stateCode, 'ContractState') :
                '',
            "productGroup": item.resultData.productGroup ?
                translationUtils.getTranslation('dataSource/GeneralContractSearchDataSource/1', 'enum', 'productGroup', item.resultData.productGroup, 'ProductGroup') :
                '',
            "productDescription": item.resultData.productDescription ? item.resultData.productDescription : '',
            "issueDate": item.resultData.issueDate ? item.resultData.issueDate : '',
            "startDate": item.resultData.startDate ? item.resultData.startDate : '',
            "endDate": item.resultData.endDate ? item.resultData.endDate : '',
            "paymentFrequencyDescription": item.resultData.paymentFrequencyDescription ? item.resultData.paymentFrequencyDescription : '',
            "phFullName": item.resultData.phFullName ? item.resultData.phFullName : '',
            "phEmail": item.resultData.phEmail ? item.resultData.phEmail : '',
            "ipEmail": item.resultData.ipEmail ? item.resultData.ipEmail : '',
            "initiatorName": item.resultData.initiatorName ? item.resultData.initiatorName : '',
            "businesCode": item.resultData.businesCode ? item.resultData.businesCode : '',
            "subunitName": item.resultData.subunitName ? item.resultData.subunitName : '',
            "filailName": item.resultData.filailName ? item.resultData.filailName : '',
            "companyName": item.resultData.companyName ? item.resultData.companyName : '',
            "notSandartContract": item.resultData.notSandartContract == 'true' ? 'Да' : 'Нет',
            "paid": item.resultData.stateCode === policyState.Activated ? 'Да' : 'Нет',
            "verifState": item.resultData.verifState ?
                translationUtils.getTranslation(`document/LifeInsuranceAttachmentVerification/1`, 'states', null, item.resultData.verifState) :
                '',
            "verifErrorsList": item.resultData.verifErrorsList ? item.resultData.verifErrorsList : '',
            "insuranceTerms": item.resultData.insuranceTerms ? item.resultData.insuranceTerms : '',
            "currencyDesc": item.resultData.currencyDesc ? item.resultData.currencyDesc : '',
            "riskPremiumAll": item.resultData.riskPremiumAll ? item.resultData.riskPremiumAll : '',
            "dob": item.resultData.dob ? item.resultData.dob : '',
            "coach": item.resultData.coach ? item.resultData.coach : '',
            "territorialChief": item.resultData.territorialChief ? item.resultData.territorialChief : '',
            "regionalChief": item.resultData.regionalChief ? item.resultData.regionalChief : '',
            "segment": salesSegmentData ? salesSegmentData : '',
            "creditSum": item.resultData.creditSum ? item.resultData.creditSum : '',
            "creditRate": item.resultData.creditRate ? item.resultData.creditRate : '',
            "annuityPaymentSum": item.resultData.annuityPaymentSum ? item.resultData.annuityPaymentSum : '',
            "creditProgramId": item.resultData.creditProgramId ? item.resultData.creditProgramId : '',
            "strategyDescriptionFull": item.resultData.strategyDescriptionFull ?? '',
            "rate": (rate * 100),
            "commisionWithNDS": commisionWithNDS,
            "commisionWithoutNDS": commisionWithoutNDS,
            "riskPremium": riskPremium,
            "initiatorTabNumber": item.resultData.initiatorTabNumber ?? ''
        };
    });

    return result;
};
