'use strict';

const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

function invApplicationPrintoutMapping(input, that) {

    const isQuote = that.businessContext.configurationCodeName.endsWith('Quote');

    const body = input?.body;
    const mainInsuranceConditions = body?.mainInsuranceConditions;

    const products = lifeInsuranceConstants.product;
    const productCode = mainInsuranceConditions?.insuranceProduct?.productCode;
    const basicConditions = body?.basicConditions;
    const isAfter20230928 = dateHelper.isAfter(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-09-27'));
    const isNOTE = [products.NOTE3BFKO, products.NOTE1BFKO, products.NOTE1BFKO3, products.NOTE1BFKO4, products.NOTE1BFKO5, products.NOTE3BFKO].includes(productCode);
    const isNOTE1 = productCode == products.NOTE1BFKO;
    const isNOTE1B3 = productCode == products.NOTE1BFKO3;
    const isNOTE1BFKO4 = productCode == products.NOTE1BFKO4;
    const isNOTE1Delcaration = [products.NOTE1BFKO, products.NOTE1BFKO3, products.NOTE1BFKO4, products.NOTE1BFKO5].includes(productCode);
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);

    const isDynamicAppVTB = lifeInsuranceConstants.productGroupArray.DYNAMIC_APP_VTB.includes(productCode);
    const isDynamicAppPSB = lifeInsuranceConstants.productGroupArray.DYNAMIC_APP_PSB.includes(productCode);
    const isIDGZENIT = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);
    const isDynamicApp = isDynamicAppVTB || isDynamicAppPSB || isIDGZENIT;

    const quoteBasisActiveVTBProducts = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_VTB;
    const policyBasisActiveVTBProducts = [products.IDG2ZENIT, products.IBAP3VTB, products.IBAP5VTB, products.IBAV3VTB, products.IBAV5VTB, products.IBA2P3];
    let basisActiveVTBProducts = policyBasisActiveVTBProducts;

    if (isQuote) {
        basisActiveVTBProducts = quoteBasisActiveVTBProducts;
    }

    const isBasisActiveVTB = basisActiveVTBProducts.includes(productCode) ||
        lifeInsuranceConstants.productGroupArray.APP_DRIVER_GARANT_VTB.includes(productCode) ||
        lifeInsuranceConstants.productGroupArray.PRE_EQUITY_VTB.includes(productCode);
    const isDriverGarantVTB = lifeInsuranceConstants.productGroupArray.APP_DRIVER_GARANT_VTB.includes(productCode);
    const isIBAKVV5VTB = [products.IBAKVV5VTB].includes(productCode);
    const isBasisActive2VTB = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(productCode);
    const investmentStrategyCode = body?.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;
    const isStrategyMajorLeague60 = investmentStrategyCode == 'majorLeague 6.0';
    const { policy } = printoutsHelper.getPollicyInfo(input, that);
    const futureContractNumber = printoutsHelper.getFutureContractNumber(input);
    const issueDate = basicConditions?.issueDate;
    const riskPremium = basicConditions?.riskPremium;
    const isPolicyHolder = body?.insuredPerson?.isPolicyHolder;
    const initiator = body?.initiator;

    const holder = printoutsHelper.getHolderInfoForApplicationInsurance(input);
    let insured = printoutsHelper.getInsuredInfoForApplicationInsurance(input);
    holder.isMale = holder.gender == 'Male';
    insured.isMale = insured.gender == 'Male';

    const insuredAge = dateHelper.getYearNumber(insured.dateOfBirth, issueDate);

    holder.dateOfBirth = dateHelper.formatDate(holder.dateOfBirth, dateHelper.DateFormats.CALENDAR);
    insured.dateOfBirth = dateHelper.formatDate(insured.dateOfBirth, dateHelper.DateFormats.CALENDAR);
    holder.issueDocDate = dateHelper.formatDate(holder.issueDocDate, dateHelper.DateFormats.CALENDAR);
    insured.issueDocDate = dateHelper.formatDate(insured.issueDocDate, dateHelper.DateFormats.CALENDAR);

    const isHeritors = body?.beneficiaries?.isHeritors;

    const { isBeneficiaries, beneficiaries, shareSumIsNot1 } = printoutsHelper.getBeneficiaries(body?.beneficiaries);

    const ben1 = beneficiaries[0];
    const ben2 = beneficiaries[1];
    const ben3 = beneficiaries[2];
    const ben4 = beneficiaries[3];

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
    const reinvestContractNumber = basicConditions?.reinvestContractNumber;
    const reinvestIssueDate = dateHelper.formatDate(basicConditions?.reinvestIssueDate, dateHelper.DateFormats.CALENDAR);
    const riskPremiumFormat = printoutsHelper.formatMoneyPrint(riskPremium);
    const riskPremiumString = formatUtils.formatNumberToString(riskPremium, lifeInsuranceConstants.currency.RUB.code);

    const riskE36904 = body?.risks?.filter(item => item.risk.riskCode == 'E36904')[0];
    let DojitieDatePlus1;

    if (riskE36904) {

        DojitieDatePlus1 = dateHelper.formatDate(dateHelper.addDays(riskE36904.endDate, 1), dateHelper.DateFormats.CALENDAR);
    }

    const isDocumentActive = that.businessContext.documentState == 'Active';

    return {
        ben1,
        ben2,
        ben3,
        ben4,
        holder,
        isNOTE,
        isNOTE1,
        policy,
        insured,
        initiator,
        issueDate,
        isHeritors,
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
        isNOTE1Delcaration,
        isNOTE1B3,
        DojitieDatePlus1,
        isNOTE1BFKO4,
        isAfter20230928,
        isDynamicApp,
        isStrategyMajorLeague60,
        isBasisActiveVTB,
        isIBAKVV5VTB,
        isDriverGarantVTB,
        isBasisActive2VTB

    };
}

module.exports = {
    invApplicationPrintoutMapping
};
