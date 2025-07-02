const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const {
        body,
        policyHolder,
        insuredPerson,
        basicConditions,
        mainInsuranceConditions,
        basicInvestmentParameters,
        productCode,
        issueDate
    } = printoutsHelper.getPrintoutCommonData(input, this);

    const products = lifeInsuranceConstants.product;
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
    let holder = printoutsHelper.getPerson(policyHolder?.partyData);
    let insured = printoutsHelper.getPerson(insuredPerson?.partyData);

    const risk = printoutsHelper.getRisk(input.body, body?.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body?.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body?.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body?.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body?.insurerComment);
    const isBasisAvtiveVTB = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_VTB.includes(productCode);
    const isBasisAvtiveVtbOutpaymentAtEnd = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(productCode);
    const isBasisActive2VTB = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(productCode);
    const showApplicationForInsurancePayments =
        isBasisAvtiveVTB &&
        !lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(productCode)
        && !lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(productCode)
        && !lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_DEFAULT.includes(productCode)
        && ![lifeInsuranceConstants.product.IBA2P3].includes(productCode);

    let numberOfriskPlusByPeriod;
    if (isBasisActive2VTB) {
        numberOfriskPlusByPeriod = numberOfrisk;
        risk.mandatory.forEach(element => {
            element.existRiskInsuredSumByPeriod = element.riskInsuredSumByPeriod.length > 0;
            element.numberOfriskByPeriod = 0;
            if (element.existRiskInsuredSumByPeriod) {
                element.numberOfriskByPeriod = element.riskInsuredSumByPeriod.length + 1;
                numberOfriskPlusByPeriod = numberOfriskPlusByPeriod + element.riskInsuredSumByPeriod.length;
            }
            if (element.riskCode == 'E36904') {
                element.insuranceRisksCBR = 'Дожитие';
                element.insurancePaymentCBR = '100% страховой суммы и дополнительный инвестиционный доход, при его наличии';
            }
            if (element.riskCode == 'DLP36904') {
                element.insuranceRisksCBR = 'Смерть';
                element.insurancePaymentCBR = '100% страховой суммы и дополнительный инвестиционный доход, при его наличии';
            }
            if (element.riskCode == 'DNS36904') {
                element.insuranceRisksCBR = 'Смерть НС';
                element.insurancePaymentCBR = '100% страховой суммы';
            }
        });
    }

    let coolOffDays = 31;
    if (isBasisAvtiveVTB) {
        coolOffDays = 0;
    }

    let surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues, coolOffDays);
    if (isBasisActive2VTB) {
        surrenderValues = printoutsHelper.getSurrenderValuesWithRisk(surrenderValues, input.body.risks, 'DLP36904');
    }

    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body?.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, policyHolder?.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body?.paymentPlan, body);
    const typeOfPartner = printoutsHelper.getMemoPartner(mainInsuranceConditions.partner.partnerBusinessCode);
    const strategyCode = basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;

    // TODO_PRINT
    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    let purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    let dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const isBasisActiveVTB =
        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB.includes(productCode) ||
        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(productCode);
    if (isBasisActiveVTB) {
        purchaseDate = printoutsHelper.formatDatePrint(body?.policyTerms?.effectiveDate);
        dischargeDate = printoutsHelper.formatDatePrint(body?.policyTerms?.endDate);
    }

    const creditRating = printoutsHelper.getCreditRating(issueDate, productCode);

    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureOnlyForHolder = true;
    const isPolicyHolderSignature = false;
    const isAfter20240212 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2024-02-12'));
    const isAfter20250101 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2025-01-01'));
    let signatureSettings = {};
    if (isAfter20240212) {
        signatureSettings = {
            issueDate: issueDate,
            isPolicyHolder: isPolicyHolderSignature,
            signatureOnlyForHolder: signatureOnlyForHolder
        };
    } else {
        signatureSettings = {
            issueDate: issueDate
        };
    }
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentHolder2 = printoutsHelper.getBottomLeftContentHolder2(signatureSettings);
    const signatureSettingsBoth = {
        issueDate: issueDate
    };
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettingsBoth);

    let newProduct = false;
    if (dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2024-04-24'))) {
        if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_VTB.includes(productCode)) {
            newProduct = true;
        }
    }

    let secondRisk = 'DLP36904';
    if (isBasisActive2VTB) {
        // фиктивный риск
        secondRisk = 'FictiveRisk';
    }
    const difference = printoutsHelper.getDifference2(body?.risks, 'E36904', secondRisk);
    let differenceDNS = {};
    const isThreeRisks = lifeInsuranceConstants.productGroupArray.PRINTOUT_CB_THREE_RISKS_TABLE.includes(productCode);
    let thirdRisk = 'DNS36904';
    if (isBasisActive2VTB) {
        thirdRisk = 'DNS36904';
    }
    if (isThreeRisks) {
        differenceDNS = printoutsHelper.getDifference2(input.body.risks, thirdRisk, 'DLP36904');
    }

    const dataBasicInvestment = {
        baseActiveDescription: basicInvestmentParameters?.baseActiveDescription,
        investmentStrategyDescriptionFull: basicInvestmentParameters?.investmentStrategyDescriptionFull,
        emitent: basicInvestmentParameters?.emitent,
        participationCoeff: round((basicInvestmentParameters?.participationCoeff ?? 1) * 100, 2) + '%'
    };
    const holderGenderMale = policyHolder?.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const insuredGenderMale = insuredPerson?.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(policyHolder?.partyData.partyBody.partyPersonData?.dateOfBirth, issueDate);
    holder = printoutsHelper.getPersonData(holder, policyHolder?.partyData);
    insured = printoutsHelper.getPersonData(insured, insuredPerson?.partyData);
    const isPolicyHolder = insuredPerson?.isPolicyHolder;
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, issueDate);
    const BFKOpartner = mainInsuranceConditions.partner.partnerBusinessCode == '249411';
    let historyIncome = basicConditions.insuranceTerms == 5 ? '9.39' : '4.65';
    if (dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2023-04-11'))) {
        historyIncome = basicConditions.insuranceTerms == 5 ? '9.39' : '0.52';
    }
    if (dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2024-03-25'))) {
        const basisActiveCodes = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE;
        if (basisActiveCodes.includes(productCode)) {
            historyIncome = basicConditions.insuranceTerms == 5 ? '0.8' : '0.15';
        }
    }
    const optionPrice = round((input.body?.basicInvestmentParameters.optionPrice ?? 1) * 100, 2);
    const is36 = optionPrice == '36';
    const is26_3 = optionPrice == '26.3';
    const is26_5 = optionPrice == '26.5';
    const is28 = optionPrice == '28';
    const is39 = optionPrice == '39';
    const is29_4 = optionPrice == '29.4';
    const is41_5 = optionPrice == '41.5';
    const isAfter20221101 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2022-11-01'));
    const isNewTextPSB = printoutsHelper.unpayedPremiumCondition(basicConditions.issueDate, productCode);
    const isDynamicOptionPrice = [products.IBA2P3].includes(productCode);
    const isDynamicEmitent = [products.IBA2P3, products.IBAV3VTB, products.IBAV5VTB, products.IBAP3VTB, products.IBAP5VTB].includes(productCode) || isBasisActive2VTB;
    const isNewText = [products.IBA2P3].includes(productCode);

    const discount = input.body?.basicInvestmentParameters?.discount;

    let reducePrintoutPagesTotalNumber;
    let countReducePrintoutPagesTotalNumber = 0;
    if (isAfter20240212) {
        countReducePrintoutPagesTotalNumber += 5; // Памятка ЦБ
    }
    const isVTBpartner = mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;
    const holder70plus = dateTimeUtils.getYearNumber(policyHolder?.partyData?.partyBody?.partyPersonData?.dateOfBirth, issueDate) >= 71;
    if (isVTBpartner) {
        countReducePrintoutPagesTotalNumber += 1;
        if (holder70plus) {
            countReducePrintoutPagesTotalNumber += 1;
        }
    }
    if (countReducePrintoutPagesTotalNumber > 0) {
        reducePrintoutPagesTotalNumber = printoutsHelper.reducePrintoutPagesTotalNumber(countReducePrintoutPagesTotalNumber);
    }
    const hiddenTextSurrenderValues = isVTBpartner || [products.IBA2P3].includes(productCode);
    const outpaymentPlan = printoutsHelper.getOutpaymentPlan(input.body?.outpaymentPlan);
    const outpaymentPlanPeriodCount = outpaymentPlan?.length;
    const outpaymentPlanFirstPeriodStart = outpaymentPlan[0]?.outpaymentPeriodStart;
    const outpaymentPlanLastPeriodEnd = outpaymentPlan[outpaymentPlan.length - 1]?.outpaymentPeriodEnd;
    const isOutpaymentPlanExist = outpaymentPlan?.length > 0;

    const outpaymentPlanDidDatesString = outpaymentPlan
        .filter(period => period.outpaymentDidDate.toLowerCase() != 'нет')
        .map(period => period.outpaymentDidDate)
        .join(', ');

    const strategyDescription = input.body?.basicInvestmentParameters?.investmentStrategyDescriptionFull;
    const isIBA2P3 = [products.IBA2P3].includes(productCode);
    const isDihodText = [products.IBA2P3, products.IBAKVV5VTB, products.IBAKVP5VTB].includes(productCode);
    const baseActiveDescription = body?.basicInvestmentParameters?.baseActiveDescription;
    const BASIS_ACTIVE_CHOSE_VTB_ALL = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_VTB.includes(productCode);
    const discountMinus = discount <= 0;
    const discountText = discount == undefined ? `` : discountMinus ? `уменьшенное на ${Math.abs(discount)}%` : `увеличенное на ${discount}%`;
    const discountFormula = discount == undefined ? `` : discountMinus ? `- ${Math.abs(discount)} % )` : `+ ${discount} % )`;
    const isPremiumSplit = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(basicConditions.issueDate), dateTimeUtils.formatDate('2025-05-01'));

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
        purchaseDate,
        dischargeDate,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentHolder2,
        bottomLeftContentBoth,
        newProduct,
        difference,
        dataBasicInvestment,
        holderGenderMale,
        holder60plus,
        isPolicyHolder,
        holderInfo,
        BFKOpartner,
        is36,
        is26_3,
        is26_5,
        is28,
        is39,
        historyIncome,
        isAfter20221101,
        is29_4,
        is41_5,
        reducePrintoutPagesTotalNumber,
        isAfter20240212,
        isAfter20250101,
        isVTBpartner,
        optionPrice,
        holder70plus,
        creditRating,
        discount,
        isBasisActiveVTB,
        strategyDescription,
        outpaymentPlan,
        isOutpaymentPlanExist,
        outpaymentPlanPeriodCount,
        outpaymentPlanFirstPeriodStart,
        outpaymentPlanLastPeriodEnd,
        outpaymentPlanDidDatesString,
        isDynamicOptionPrice,
        isDynamicEmitent,
        isNewText,
        isIBA2P3,
        isDihodText,
        insuredGenderMale,
        differenceDNS,
        isThreeRisks,
        isBasisActive2VTB,
        numberOfriskPlusByPeriod,
        showApplicationForInsurancePayments,
        isBasisAvtiveVtbOutpaymentAtEnd,
        isNewTextPSB,
        baseActiveDescription,
        discountMinus,
        discountText,
        BASIS_ACTIVE_CHOSE_VTB_ALL,
        discountFormula,
        hiddenTextSurrenderValues,
        isPremiumSplit
    };
};
