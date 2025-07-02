const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {

    const { body } = printoutsHelper.getPrintoutCommonData(input, this);

    const {
        personalAcc,
        bankName,
        city,
        correspAcc,
        bic
    } = printoutsHelper.getBankInfoByBody(body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const policyInfo = printoutsHelper.getPollicyInfo(input, this);
    const {
        policy,
        currency
    } = policyInfo;
    let {
        experationDate
    } = policyInfo;
    let holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    let numberOfriskPlusByPeriod = numberOfrisk;
    risk.mandatory.forEach(element => {
        element.existRiskInsuredSumByPeriod = element.riskInsuredSumByPeriod.length > 0;
        element.numberOfriskByPeriod = 0;
        if (element.existRiskInsuredSumByPeriod) {
            element.numberOfriskByPeriod = element.riskInsuredSumByPeriod.length + 1;
            numberOfriskPlusByPeriod = numberOfriskPlusByPeriod + element.riskInsuredSumByPeriod.length;
        }
    });
    const insuranceTerms = printoutsHelper.getTerms(body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body.insurerComment);
    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const productConf = input.body?.productConfiguration ?? {};
    const coolOffDays = productConf.coolOffPeriodDays;
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = body.basicConditions;
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);
    const strategyCode = getValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode');
    let baseActiveDescription = getValue(body, 'basicInvestmentParameters.baseActiveDescription');
    baseActiveDescription = baseActiveDescription.replaceAll("),", ");") + ".";
    const baseActiveDescriptionTable = baseActiveDescription.split(/(?<=\); )/);
    const optionPrice = round(getValue(body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    // const participationCoeff = round(getValue(body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%';
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureOnlyForHolder = true;
    const isPolicyHolder = false;
    const signatureSettings = {
        issueDate: basicConditions?.issueDate,
        isPolicyHolder: isPolicyHolder,
        signatureOnlyForHolder: signatureOnlyForHolder
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    // let signatureName = printoutsHelper.getSignatureName(signatureSettings);
    // let signatureImg = printoutsHelper.getSignatureLink(signatureName);
    const signatureSettingsBoth = {
        issueDate: basicConditions?.issueDate
    };
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettingsBoth);
    const newProduct = true;
    const difference = printoutsHelper.getDifference2(body.risks, 'E36904', 'DLP36904');
    const dataBasicInvestment = {
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        fixRate: round(getValue(body, 'basicInvestmentParameters.fixRate'), 2) + '%',
        intialShare: round(getValue(body, 'basicInvestmentParameters.intialShare'), 2)
    };

    // TODO_PRINT
    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const barrierAutoCall = getValue(body, 'basicInvestmentParameters.barrierAutoCall'); // не для этого продукта

    const participationCoeffByPeriods = getValue(body, 'basicInvestmentParameters.participationCoeffByPeriods');
    const participationCoeffByPeriodsTable = participationCoeffByPeriods.split('; ');
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, body.basicConditions.issueDate);

    const products = lifeInsuranceConstants.product;
    const isNOTE1 = productCode == products.NOTE1BFKO;
    const isNOTE1BFKO3 = productCode == products.NOTE1BFKO3;
    const isNOTE1BFKO4 = productCode == products.NOTE1BFKO4;
    const isNOTEV3BFKO = productCode == products.NOTEV3BFKO;
    const isNOTEV1BFKO = productCode == products.NOTEV1BFKO;

    const investmentStrategyCode = getValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode');
    const isStrategyMajorLeague50 = investmentStrategyCode == 'majorLeague 5.0';
    const isStrategyMajorLeague60 = investmentStrategyCode == 'majorLeague 6.0';

    let barrier;
    if (isStrategyMajorLeague60) {
        barrier = 110;
    } else if (isNOTEV1BFKO) {
        barrier = 90;
    } else {
        barrier = 80;
    }

    const basicInvestCouponPeriods = body.basicInvestmentParameters.couponPeriods;

    let couponPeriods;
    if (isNOTE1BFKO4) {
        couponPeriods = basicInvestCouponPeriods &&
            basicInvestCouponPeriods.map((item, idx) => {
                return {
                    number: idx + 1,
                    beginDate: printoutsHelper.formatDatePrint(item.beginDate),
                    endDate: printoutsHelper.formatDatePrint(item.endDate),
                    participationCoeff: participationCoeffByPeriodsTable[idx].replace(/,/, '.') + '%', // dataBasicInvestment.fixRate,
                    barrierAutoCall: (((idx == 0) || (idx == 3)) ? ('нет') : (barrierAutoCall + '%')),
                    barrierCancelDID: (isStrategyMajorLeague50 ? 'нет' : (barrier + '%'))
                };
            }) || [];
    } else if (isNOTEV3BFKO) {
        couponPeriods = basicInvestCouponPeriods &&
            basicInvestCouponPeriods.map((item, idx) => {
                return {
                    number: idx + 1,
                    beginDate: printoutsHelper.formatDatePrint(item.beginDate),
                    endDate: printoutsHelper.formatDatePrint(item.endDate),
                    participationCoeff: round(participationCoeffByPeriodsTable[idx].replace(/,/, '.'), 2) + '%', // dataBasicInvestment.fixRate,
                    barrierAutoCall: ((idx == 4) ? ('нет') : (barrierAutoCall + '%')),
                    barrierCancelDID: (barrier + '%')
                };
            }) || [];
    } else if (isNOTEV1BFKO) {
        couponPeriods = basicInvestCouponPeriods &&
            basicInvestCouponPeriods.map((item, idx) => {
                return {
                    number: idx + 1,
                    beginDate: printoutsHelper.formatDatePrint(item.beginDate),
                    endDate: printoutsHelper.formatDatePrint(item.endDate),
                    participationCoeff: participationCoeffByPeriodsTable[idx].replace(/,/, '.') + '%', // dataBasicInvestment.fixRate,
                    barrierAutoCall: (((idx == 0) || (idx == 3)) ? ('нет') : (idx == 2) ? ('105%') : ('110%')),
                    barrierCancelDID: (isStrategyMajorLeague50 ? 'нет' : (barrier + '%'))
                };
            }) || [];
    } else {
        couponPeriods = basicInvestCouponPeriods &&
            basicInvestCouponPeriods.map((item, idx) => {
                return {
                    number: idx + 1,
                    beginDate: printoutsHelper.formatDatePrint(item.beginDate),
                    endDate: printoutsHelper.formatDatePrint(item.endDate),
                    participationCoeff: round(participationCoeffByPeriodsTable[idx].replace(/,/, '.'), 2) + '%', // dataBasicInvestment.fixRate,
                    barrierAutoCall: (isNOTE1) ? ((idx == 1) ? (barrierAutoCall + '%') : ('нет')) : (((idx == 1) || (idx == 2)) ? (barrierAutoCall + '%') : ('нет'))
                };
            }) || [];
    }
    // const strategyDescriptionFull = instrumentsParams.strategyDescriptionFull;
    const strategyDescriptionFull = getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull');
    const toolType = getValue(body, 'basicInvestmentParameters.toolType');
    const calculatingAgent = getValue(body, 'basicInvestmentParameters.calculatingAgent');
    const partOfPremiumForTool = round(getValue(body, 'basicInvestmentParameters.partOfPremiumForTool') * 100, 2);
    const priceOfMeasureTool = round(getValue(body, 'basicInvestmentParameters.priceOfMeasureTool') * 100, 2);
    const measureToolNominal = getValue(body, 'basicInvestmentParameters.measureToolNominal');
    let instrumentsCount;
    if (partOfPremiumForTool && priceOfMeasureTool && measureToolNominal) {
        instrumentsCount = round((commission.allPremium * partOfPremiumForTool) / (priceOfMeasureTool * measureToolNominal), 6);
    }

    if (isNOTEV3BFKO || isNOTEV1BFKO) {
        holder = printoutsHelper.getPersonData(holder, body.policyHolder.partyData);
        insured = printoutsHelper.getPersonData(insured, body.insuredPerson.partyData);
    }

    if (isNOTEV1BFKO) {
        const experationDateFormat = dateUtils.parseLocalDateToISO(experationDate);
        experationDate = printoutsHelper.formatDatePrint(dateUtils.substractDays(experationDateFormat, 1));

    }

    const paymentPlan = printoutsHelper.getPaymentPlan(body.paymentPlan);
    const signatureNone = printoutsHelper.getSignatureNone();

    return {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
        insured,
        risk,
        insuranceTerms,
        payDay,
        declarationMedical,
        declarationMain,
        otherCondition,
        surrenderValues,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        QR,
        numberOfrisk,
        exampleLabel,
        main,
        commission,
        typeOfPartner,
        baseActiveDescription,
        baseActiveDescriptionTable,
        optionPrice,
        // participationCoeff,
        purchaseDate,
        dischargeDate,
        couponPeriods,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth,
        newProduct,
        difference,
        dataBasicInvestment,
        barrier,
        strategyDescriptionFull,
        barrierAutoCall,
        isNOTE1,
        isNOTE1BFKO3,
        isNOTE1BFKO4,
        toolType,
        partOfPremiumForTool,
        priceOfMeasureTool,
        measureToolNominal,
        instrumentsCount,
        calculatingAgent,
        numberOfriskPlusByPeriod,
        isStrategyMajorLeague50,
        holderInfo,
        isNOTEV3BFKO,
        isStrategyMajorLeague60,
        isNOTEV1BFKO,
        paymentPlan,
        signatureNone
    };
};
