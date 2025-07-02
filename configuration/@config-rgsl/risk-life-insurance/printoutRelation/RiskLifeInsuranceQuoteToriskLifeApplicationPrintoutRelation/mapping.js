const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function mapping(input) {

    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const products = lifeInsuranceConstants.product;
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);

    const {
        policy
    } = printoutsHelper.getPollicyInfo(input, this);
    const futureContractNumber = printoutsHelper.getFutureContractNumber(input);
    const issueDate = input.body.basicConditions.issueDate;
    const riskPremium = input.body.basicConditions.riskPremium;
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;

    const holder = printoutsHelper.getHolderInfoForApplicationInsurance(input);
    let insured = printoutsHelper.getInsuredInfoForApplicationInsurance(input);
    holder.isMale = holder.gender == partyConstants.gender.Male;
    insured.isMale = insured.gender == partyConstants.gender.Male;

    const insuredAge = dateHelper.getYearNumber(insured.dateOfBirth, issueDate);

    holder.dateOfBirth = dateHelper.formatDate(holder.dateOfBirth, dateHelper.DateFormats.CALENDAR);
    insured.dateOfBirth = dateHelper.formatDate(insured.dateOfBirth, dateHelper.DateFormats.CALENDAR);
    holder.issueDocDate = dateHelper.formatDate(holder.issueDocDate, dateHelper.DateFormats.CALENDAR);
    insured.issueDocDate = dateHelper.formatDate(insured.issueDocDate, dateHelper.DateFormats.CALENDAR);

    if (holder.addressFactial.isSameAsRegistration) {
        holder.addressFactial = {};
        holder.addressFactial.isSameAsRegistration = true;
    }

    if (insured.addressFactial.isSameAsRegistration) {
        insured.addressFactial = {};
        insured.addressFactial.isSameAsRegistration = true;
    }

    if (isPolicyHolder) {
        insured = {};
    }

    const issueDatePrintout = dateHelper.formatDate(issueDate, dateHelper.DateFormats.CALENDAR);
    const reinvestContractNumber = input.body.basicConditions.reinvestContractNumber;
    const reinvestIssueDate = dateHelper.formatDate(input.body.basicConditions.reinvestIssueDate, dateHelper.DateFormats.CALENDAR);
    const riskPremiumFormat = printoutsHelper.formatMoneyPrint(riskPremium);
    const riskPremiumString = formatUtils.formatNumberToString(riskPremium, lifeInsuranceConstants.currency.RUB.code);

    const riskE36904 = input.body.risks.filter(item => item.risk.riskCode == 'E36904')[0];
    let DojitieDatePlus1;
    if (riskE36904) {
        DojitieDatePlus1 = dateHelper.formatDate(dateHelper.addDays(riskE36904.endDate, 1), dateHelper.DateFormats.CALENDAR);
    }

    const isDynamicAppVTB = [products.EBMGVTB, products.EBMGNVTB, products.EBMGUBRR].includes(productCode);
    const isHeritors = input.body?.beneficiaries.isHeritors;

    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);

    const ben1 = beneficiaries[0];
    const ben2 = beneficiaries[1];
    const ben3 = beneficiaries[2];
    const ben4 = beneficiaries[3];

    const isDocumentActive = this.businessContext.documentState == lifeInsuranceConstants.policyState.Active;
    const { frequency, notLump } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, undefined, notLump, insuredAge);
    const existsCDH10800 = risk.additional.some(item => item.riskCode == 'CDHR10800' || item.riskCode == 'CDHW10800');
    const riskCDHR10800 = input.body.risks.filter(item => item.risk.riskCode == 'CDHR10800');
    const riskCDHW10800 = input.body.risks.filter(item => item.risk.riskCode == 'CDHW10800');
    const existsPackage1 = input.body?.risksPackages?.selectedPackages?.some(item => item.packageCode == 'TERMVVTB1');

    return {
        holder,
        policy,
        insured,
        issueDate,
        productCode,
        riskPremium,
        isPolicyHolder,
        futureContractNumber,
        isReinvest,
        reinvestContractNumber,
        reinvestIssueDate,
        riskPremiumString,
        riskPremiumFormat,
        insuredAge,
        isDocumentActive,
        issueDatePrintout,
        DojitieDatePlus1,
        isDynamicAppVTB,
        isHeritors,
        ben1,
        ben2,
        ben3,
        ben4,
        existsCDH10800,
        riskCDHR10800,
        riskCDHW10800,
        existsPackage1
    };
};
