const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const { body } = printoutsHelper.getPrintoutCommonData(input, this);

    const products = lifeInsuranceConstants.product;
    const insurer = printoutsConstant.insurerInfo;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues, 31);
    const basicConditions = body.basicConditions;
    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);
    const strategyCode = getValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode');
    const baseActiveDescription = getValue(body, 'basicInvestmentParameters.baseActiveDescription');

    // TODO_PRINT
    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const dataBasicInvestment = {
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        fixRate: round(getValue(body, 'basicInvestmentParameters.fixRate'), 2),
        intialShare: round(getValue(body, 'basicInvestmentParameters.intialShare'), 2),
        baseActiveDescription: getValue(body, 'basicInvestmentParameters.baseActiveDescription'),
        participationCoeff: round(getValue(body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%',
        investmentStrategyDescriptionFull: getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull')
    };
    const investPeriod = printoutsHelper.getPeriodTable(body.basicInvestmentParameters, dataBasicInvestment);
    const newProduct = true;

    const basisInvest = [products.IBI3BFKO, products.IBI5BFKO, products.IBI3BFKO17, products.IBI5BFKO17, products.IBI3ZENIT17, products.IBI5ZENIT17].includes(productCode);
    const basisActiv = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE.includes(productCode);
    const strategyFiveInvest = [products.EBMIBFKO].includes(productCode);

    const difference = strategyFiveInvest ?
        printoutsHelper.getDifference3(body.risks, 'IE36904', 'fake', body.paymentPlan) :
        printoutsHelper.getDifference2(body.risks, 'E36904', 'DLP36904');
    if (strategyFiveInvest) {
        surrenderValues[0].periodStartDate = 'со следующего дня после уплаты 3-го платежа (страхового взноса)';
    }

    let historyIncome = body.basicConditions.insuranceTerms == 5 ? '9.39' : '4.65';
    if (dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2023-04-11'))) {
        historyIncome = body.basicConditions.insuranceTerms == 5 ? '9.39' : '0.52';
    }

    const optionPrice = round(getValue(body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    const is36 = optionPrice == '36';
    const is26_5 = optionPrice == '26.5';
    const is26_3 = optionPrice == '26.3';
    const is28 = optionPrice == '28';
    const is39 = optionPrice == '39';
    const is29_4 = optionPrice == '29.4';
    const is41_5 = optionPrice == '41.5';
    const paymentPlan = printoutsHelper.getPaymentPlan(body.paymentPlan);

    const isAfter20240212 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2024-02-12'));

    return {
        insurer,
        policy,
        currency,
        experationDate,
        risk,
        payDay,
        surrenderValues,
        commission,
        typeOfPartner,
        baseActiveDescription,
        purchaseDate,
        dischargeDate,
        difference,
        dataBasicInvestment,
        investPeriod,
        newProduct,
        basisInvest,
        basisActiv,
        strategyFiveInvest,
        historyIncome,
        is36,
        is26_5,
        is26_3,
        is28,
        is39,
        is29_4,
        is41_5,
        paymentPlan,
        isAfter20240212
    };
};
