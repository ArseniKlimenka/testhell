const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const body = input?.body;
    const mainInsuranceConditions = body?.mainInsuranceConditions;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const products = lifeInsuranceConstants.product;
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);
    const isReinvestEarlyTermination = [products.EBMMGREINVEST].includes(productCode);

    const { policy } = printoutsHelper.getPollicyInfo(input, this);
    const futureContractNumber = printoutsHelper.getFutureContractNumber(input);
    const issueDate = body?.basicConditions?.issueDate;
    const riskPremium = body?.basicConditions?.riskPremium;
    const isPolicyHolder = body?.insuredPerson?.isPolicyHolder;

    const holder = printoutsHelper.getHolderInfoForApplicationInsurance(input);
    let insured = printoutsHelper.getInsuredInfoForApplicationInsurance(input);
    holder.isMale = holder.gender == 'Male';
    insured.isMale = insured.gender == 'Male';

    const insuredAge = dateHelper.getYearNumber(insured.dateOfBirth, issueDate);

    holder.dateOfBirth = dateHelper.formatDate(holder.dateOfBirth, dateHelper.DateFormats.CALENDAR);
    insured.dateOfBirth = dateHelper.formatDate(insured.dateOfBirth, dateHelper.DateFormats.CALENDAR);
    holder.issueDocDate = dateHelper.formatDate(holder.issueDocDate, dateHelper.DateFormats.CALENDAR);
    insured.issueDocDate = dateHelper.formatDate(insured.issueDocDate, dateHelper.DateFormats.CALENDAR);

    if (holder.addressFactial.isSameAsRegistration == true) {
        holder.addressFactial = {};
        holder.addressFactial.isSameAsRegistration = true;
    }

    if (insured.addressFactial.isSameAsRegistration == true) {
        insured.addressFactial = {};
        insured.addressFactial.isSameAsRegistration = true;
    }

    if (isPolicyHolder) {
        insured = {};
    }

    const issueDatePrintout = dateHelper.formatDate(issueDate, dateHelper.DateFormats.CALENDAR);
    const reinvestContractNumber = body?.basicConditions?.reinvestContractNumber;
    const reinvestIssueDate = dateHelper.formatDate(body?.basicConditions?.reinvestIssueDate, dateHelper.DateFormats.CALENDAR);
    const riskPremiumFormat = printoutsHelper.formatMoneyPrint(riskPremium);
    const riskPremiumString = formatUtils.formatNumberToString(riskPremium, lifeInsuranceConstants.currency.RUB.code);

    const riskE36904 = body?.risks?.filter(item => item.risk.riskCode == 'E36904')[0];
    let DojitieDatePlus1;

    if (riskE36904) {

        DojitieDatePlus1 = dateHelper.formatDate(dateHelper.addDays(riskE36904.endDate, 1), dateHelper.DateFormats.CALENDAR);
    }


    const isDynamicAppVTB = [products.EBMGVTB, products.EBMGVVTB, products.EBMGVNVTB, products.EBMGPB, products.EBMGNVTB, products.EBMGUBRR, products.EBM3GUBRR].includes(productCode);
    const isDynamicAppECATFVTB = lifeInsuranceConstants.productGroupArray.DYNAMIC_APP_ECATF.includes(productCode);
    const isDynamicAppECOFVTB = [products.ECOFPVTB, products.ECOFVVTB, products.ECOF2ZENIT].includes(productCode);
    const isHeritors = body?.beneficiaries?.isHeritors;

    const { isBeneficiaries, beneficiaries, shareSumIsNot1, beneficiariesNonAdult, beneficiariesStandard, shareSumStandardIsNot1, isBeneficiariesStandard } = printoutsHelper.getBeneficiaries(body?.beneficiaries);

    const ben1 = beneficiaries[0];
    const ben2 = beneficiaries[1];
    const ben3 = beneficiaries[2];
    const ben4 = beneficiaries[3];

    const benNonAdult1 = beneficiariesNonAdult[0];
    const benStandard1 = beneficiariesStandard[0];
    const benStandard2 = beneficiariesStandard[1];
    const benStandard3 = beneficiariesStandard[2];
    const benStandard4 = beneficiariesStandard[3];

    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isEBMGVNVTB = lifeInsuranceConstants.product.EBMGVNVTB === productCode;

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
        isDynamicAppECATFVTB,
        benNonAdult1,
        benStandard1,
        benStandard2,
        benStandard3,
        benStandard4,
        isBeneficiariesStandard,
        isDynamicAppECOFVTB,
        isReinvestEarlyTermination,
        isEBMGVNVTB
    };
};
