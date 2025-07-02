const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const {
    round
} = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(input) {
    const {
        personalAcc,
        bankName,
        city,
        correspAcc,
        bic
    } = printoutsHelper.getBankInfoByBody(input.body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const basicConditions = input.body.basicConditions;
    const insuredAge = dateHelper.getYearNumber(input.body.insuredPerson.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, undefined, notLump, insuredAge);
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const declarationSport = printoutsHelper.getDeclaration(input.body.declarationSport);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
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
    const holder70plus = dateHelper.getYearNumber(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate) >= 71;
    const isBefore20230410 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-04-10'));
    const age70minus = insuredAge <= 70;
    const age71plus = insuredAge >= 71 && insuredAge <= 80;

    holder = printoutsHelper.getCoolDownData(holder, input.body.policyHolder.partyData);

    const isVTBpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;
    const isVTBNOTE = false;

    const riskTermLife = printoutsHelper.getRiskTermLife(risk, input.body.risksPackages);
    const isAmateurSport = input.body.amateurSportCondition.amateurSportOption;
    const isAllamateurSportDeclDeclined = !!(isAmateurSport && declarationSport.every(element => element.agreement == false));
    const isFirstPackage = input.body.risksPackages?.selectedPackages?.some(r => r.packageCode == 'TERMVVTB1');
    const isSecondPackage = input.body.risksPackages?.selectedPackages?.some(r => r.packageCode == 'TERMVVTB2');
    const existsCDH10800 = risk.additional.some(item => item.riskCode == 'CDHR10800' || item.riskCode == 'CDHW10800');
    const existsD42204 = risk.mainIP.some(item => item.riskCode == 'D42204');
    const isCDHR = risk.additional.some(item => item.riskCode == 'CDHR10800');

    const premiumRisks = printoutsHelper.termLifeInsurancePaymentFilter(riskTermLife, risk.premium.sum);
    const premiumRisksTemplate = printoutsHelper.getTemplateForInsurancePaymentTable(premiumRisks);

    const splitDate = experationDate.split('.');
    const dateDayAndMonth = `${splitDate[0]}.${splitDate[1]}`;
    const risksForTerm = input.body.risks.filter(item => item.risk.riskCode == 'CDHR10800' || item.risk.riskCode == 'CDHW10800' || item.risk.riskCode == 'D42204');
    let minRiskDate = dateHelper.getMinOfDates(risksForTerm.map(r => r.endDate));
    let maxRiskDate = dateHelper.getMaxOfDates(risksForTerm.map(r => r.endDate));
    let minRiskDatePlusDay = dateHelper.addDays(minRiskDate, 1);
    let maxRiskDatePlusDay = dateHelper.addDays(maxRiskDate, 1);
    let policyStartDate = dateHelper.parseLocalDateToISO(insuranceTerms.startDate);
    let policyEndDate = dateHelper.parseLocalDateToISO(insuranceTerms.endDate);
    const isDateEqual = dateHelper.isEqual(minRiskDate, policyEndDate);
    const riskCDHR10800 = input.body.risks.filter(item => item.risk.riskCode == 'CDHR10800');
    const riskCDHW10800 = input.body.risks.filter(item => item.risk.riskCode == 'CDHW10800');
    const riskD42204 = input.body.risks.filter(item => item.risk.riskCode == 'D42204');
    const riskPrem = formatUtils.formatMoneyToNumber(risk.premium.sum);
    const riskSumCDHR = riskPrem - riskCDHR10800[0]?.riskPremium;
    const riskSumCDHW = riskPrem - riskCDHW10800[0]?.riskPremium;
    const isEqualD42204 = dateHelper.isEqual(riskD42204[0]?.endDate, policyEndDate);
    let resultSumCDH = riskSumCDHR ?? riskSumCDHW;
    const riskSumD42204 = formatUtils.formatNumberToMoney(round(resultSumCDH - riskD42204[0]?.riskPremium, 2));
    let isDoubleRisk = false;
    let onlyD42204 = false;
    let onlyCDH = false;
    minRiskDate = printoutsHelper.formatDatePrint(minRiskDate);
    maxRiskDate = printoutsHelper.formatDatePrint(maxRiskDate);
    minRiskDatePlusDay = printoutsHelper.formatDatePrint(minRiskDatePlusDay);
    maxRiskDatePlusDay = printoutsHelper.formatDatePrint(maxRiskDatePlusDay);
    policyStartDate = printoutsHelper.formatDatePrint(policyStartDate);
    policyEndDate = printoutsHelper.formatDatePrint(policyEndDate);

    if (!existsCDH10800 && existsD42204 && !isDateEqual) {
        onlyD42204 = true;
    }

    if (existsCDH10800 && !isDateEqual && isEqualD42204) {
        onlyCDH = true;
    }

    if (existsCDH10800 && existsD42204 && !isDateEqual && !isEqualD42204) {
        isDoubleRisk = true;
    }

    if (riskCDHR10800) {
        resultSumCDH = formatUtils.formatNumberToMoney(round(riskSumCDHR));
    } else if (riskSumCDHW) {
        resultSumCDH = formatUtils.formatNumberToMoney(round(riskSumCDHW));
    }
    const isTextVTBAfterDecember = printoutsHelper.unpayedPremiumCondition(input.body.basicConditions.issueDate, productCode);

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
        declarationSport,
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
        isBefore20230410,
        age70minus,
        age71plus,
        isVTBpartner,
        isVTBNOTE,
        holder70plus,
        riskTermLife,
        isAmateurSport,
        isFirstPackage,
        isSecondPackage,
        existsCDH10800,
        existsD42204,
        isCDHR,
        isDateEqual,
        resultSumCDH,
        riskSumD42204,
        minRiskDate,
        maxRiskDate,
        policyStartDate,
        policyEndDate,
        minRiskDatePlusDay,
        maxRiskDatePlusDay,
        isDoubleRisk,
        onlyD42204,
        onlyCDH,
        dateDayAndMonth,
        isAllamateurSportDeclDeclined,
        premiumRisksTemplate,
        isTextVTBAfterDecember,
    };

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;
};
