const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {

    const products = lifeInsuranceConstants.product;
    const { personalAcc, bankName, city, correspAcc, bic } = printoutsHelper.getBankInfoByBody(input.body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const bankInfo1 = `р/с: ${personalAcc} ${bankName}, ${city},`;
    const bankInfo2 = `к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const { policy, currency, experationDate } = printoutsHelper.getPollicyInfo(input, this);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const { frequency, notLump } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const basicConditions = input.body.basicConditions;
    const insuredAge = dateHelper.getYearNumber(input.body.insuredPerson.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, undefined, notLump, insuredAge);
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    const { isBeneficiaries, beneficiaries, shareSumIsNot1, beneficiariesNonAdult, beneficiariesStandard, shareSumStandardIsNot1, isBeneficiariesStandard } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const paymentPlan = printoutsHelper.getPaymentPlan(input.body.paymentPlan);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: basicConditions?.issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const signatureNone = printoutsHelper.getSignatureNone();
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, input.body.basicConditions.issueDate);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    const holder60plus = printoutsHelper.getAge(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    const BFKOpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '249411';
    const ZenithPartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '191127';
    const OASpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '247457';
    const AkceptPartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '431120';
    const MinBankPartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '110256';
    const EBMOAS2Product = productCode == "EBMOAS2";
    const isFullPrintout = MinBankPartner || EBMOAS2Product;
    const isBefore20230410 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-04-10'));
    const age70minus = insuredAge <= 70;
    const age71plus = insuredAge >= 71 && insuredAge <= 80;
    const EBMOPTIMAOAS2 = productCode == "EBMOPTIMAOAS2";

    holder = printoutsHelper.getCoolDownData(holder, input.body.policyHolder.partyData);

    const isVTBpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;
    const isVTBNOTE = false;
    const isECATFVTB = [products.ECATFPVTB, products.ECATFVVTB, products.ECATFZENIT, products.ECATFUBRR].includes(productCode);
    const isBankInfoTwoLine = [products.ECATFZENIT, products.ECATFUBRR, products.EBMOPTIMAOAS2].includes(productCode);
    const isNewTextPSB = printoutsHelper.unpayedPremiumCondition(basicConditions.issueDate, productCode);
    const isNewTextEBMGUBRR = [products.EBMGUBRR].includes(productCode);
    const isNewTextOAS_EBM3GUBRR = [products.EBMOAS2, products.EBMOPTIMAOAS2, products.EBM3GUBRR].includes(productCode);
    const isNewTextStrong = [products.EBM3GUBRR].includes(productCode);
    const newBankDoc = lifeInsuranceConstants.productGroupArray.ZENIT_NEW_BANK_DOCS.includes(productCode) && DateTimeUtils.isAfterOrEqual(basicConditions?.issueDate, '2025-02-24');
    const isBefore20250401 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2025-04-01'));
    const isVTBBankDocument = isVTBpartner && isBefore20250401;
    const isEBMAKCEPT = productCode == "EBMAKCEPT";

    if (isECATFVTB) {

        const riskMandatoryBuff = [];
        if (input.body.beneficiaries.isNotHeritors &&
            input.body.beneficiaries?.beneficiaries?.length > 0) {

            let beneficiariesAge;
            const beneficiariesNonAdultStruct = input.body.beneficiaries?.beneficiaries
                .find(item => item.beneficiaryCategory == 'NonAdult');

            if (beneficiariesNonAdultStruct && beneficiariesNonAdultStruct.dateOfBirth) {

                beneficiariesAge = dateHelper.getYearDifference(beneficiariesNonAdultStruct.dateOfBirth, input.body.policyTerms.endDate);
            }

            risk.mandatory.find(item => item.riskCode == 'DLPDPE36404').insurancePayment = '100% страховой суммы, выплата осуществляется по достижении Выгодоприобретателем по данному риску ' + beneficiariesAge + ' - летнего возраста, но не ранее даты окончания срока действия договора страхования';
        }
        printoutsHelper.pushElementByRiskCode(riskMandatoryBuff, risk.mandatory, 'E36404');
        printoutsHelper.pushElementByRiskCode(riskMandatoryBuff, risk.mandatory, 'DLPDPE36404');
        printoutsHelper.pushElementByRiskCode(riskMandatoryBuff, risk.mandatory, 'DLPVV36404');
        printoutsHelper.pushElementByRiskCode(riskMandatoryBuff, risk.mandatory, 'D36404');
        printoutsHelper.pushElementByRiskCode(riskMandatoryBuff, risk.mandatory, 'DA36404');
        risk.mandatory = riskMandatoryBuff;
    }

    const isBarCodeNeed = false;
    const barCodePolicyNumber = policy?.number ? policy?.number.replace('-', '') : '';
    const isAfter02072025 = DateTimeUtils.isAfterOrEqual(basicConditions?.issueDate, '2025-02-07');

    const output = {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        isPolicyHolder,
        holder,
        insured,
        frequency,
        risk,
        insuranceTerms,
        declarationMedical,
        declarationMain,
        otherCondition,
        surrenderValues,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        paymentPlan,
        QR,
        exampleLabel,
        typeOfPartner,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth,
        signatureNone,
        holderInfo,
        holder60plus,
        BFKOpartner,
        ZenithPartner,
        OASpartner,
        AkceptPartner,
        isFullPrintout,
        isBefore20230410,
        age70minus,
        age71plus,
        isVTBpartner,
        isVTBNOTE,
        isECATFVTB,
        beneficiariesNonAdult,
        beneficiariesStandard,
        shareSumStandardIsNot1,
        isBeneficiariesStandard,
        isBarCodeNeed,
        barCodePolicyNumber,
        isBankInfoTwoLine,
        bankInfo1,
        bankInfo2,
        isNewTextPSB,
        isNewTextEBMGUBRR,
        isNewTextOAS_EBM3GUBRR,
        isNewTextStrong,
        isAfter02072025,
        newBankDoc,
        isVTBBankDocument,
        isEBMAKCEPT
    };

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;

};
