const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

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
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    const holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body.insurerComment);
    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const productConf = input.body?.productConfiguration ?? {};
    const coolOffDays = productConf.coolOffPeriodDays;
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues, coolOffDays);
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
    const baseActiveDescriptionFirst = baseActiveDescriptionTable.shift();
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

    const barrier = getValue(body, 'basicInvestmentParameters.barrier');

    const basicInvestCouponPeriods = body.basicInvestmentParameters.couponPeriods;
    const periodCount = basicInvestCouponPeriods.length - 1;
    const couponPeriods = basicInvestCouponPeriods &&
        basicInvestCouponPeriods.map((item, idx) => {
            return {
                number: idx + 1,
                beginDate: printoutsHelper.formatDatePrint(item.beginDate),
                endDate: printoutsHelper.formatDatePrint(item.endDate),
                barrier: '95%',
                participationCoeff: dataBasicInvestment.fixRate,
                barrierAutoCall: (idx == 0 || idx == periodCount) ? ('нет') : ('100%')
            };
        }) || [];
    const strategyDescriptionFull = body.basicInvestmentParameters.strategyDescriptionFull;


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
        baseActiveDescriptionFirst,
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
        strategyDescriptionFull
    };
};
