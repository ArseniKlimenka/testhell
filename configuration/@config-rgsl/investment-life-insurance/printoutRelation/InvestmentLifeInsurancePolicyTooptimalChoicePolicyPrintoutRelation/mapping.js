const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");

module.exports = function mapping(input) {

    const {
        body,
        policyHolder,
        insuredPerson,
        basicConditions,
        productCode,
        issueDate,
        basicAssetProperties
    } = printoutsHelper.getPrintoutCommonData(input, this);

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
    let holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const insuranceTerms = printoutsHelper.getTerms(body);
    const declarationMedical = printoutsHelper.getDeclaration(body?.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body?.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body?.insurerComment);

    const coolOffDays = 0;
    const surrenderValues = printoutsHelper.getSurrenderValues(body?.surrenderValues, coolOffDays);

    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body?.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, policyHolder?.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body?.paymentPlan, body);

    const creditRating = printoutsHelper.getCreditRating(issueDate, productCode);

    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureOnlyForHolder = true;
    const isPolicyHolderSignature = false;

    const signatureSettings = {
        issueDate: issueDate,
        isPolicyHolder: isPolicyHolderSignature,
        signatureOnlyForHolder: signatureOnlyForHolder
    };

    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentHolder2 = printoutsHelper.getBottomLeftContentHolder2(signatureSettings);
    const signatureSettingsBoth = {
        issueDate: issueDate
    };
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettingsBoth);

    const difference = printoutsHelper.getDifference2(body?.risks, 'E36914', 'DLP36914');
    const differenceDNS = printoutsHelper.getDifference2(body?.risks, 'DNS36414', 'DLP36914');

    holder = printoutsHelper.getPersonData(holder, policyHolder?.partyData);
    insured = printoutsHelper.getPersonData(insured, insuredPerson?.partyData);

    const countReducePrintoutPagesTotalNumber = 6; // Памятка ЦБ
    const reducePrintoutPagesTotalNumber = printoutsHelper.reducePrintoutPagesTotalNumber(countReducePrintoutPagesTotalNumber);

    const singleAsset = basicAssetProperties?.assetProperties[0]?.asset;
    const assetUnitsCountOnClient = basicAssetProperties?.assetUnitsCountOnClient?.toFixed(4);
    const assetData = input.dataSourceData.AssetDataSource.data.map(result => result.resultData);
    const singleAssetData = assetData.length > 0 ? assetData[0] : undefined;
    const investmentFrequency = basicAssetProperties?.rateOfReturnEquityActives?.investmentFrequency * 100;

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
        declarationMedical,
        declarationMain,
        otherCondition,
        surrenderValues,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        QR,
        exampleLabel,
        commission,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentHolder2,
        bottomLeftContentBoth,
        difference,
        reducePrintoutPagesTotalNumber,
        creditRating,
        differenceDNS,
        singleAsset,
        assetUnitsCountOnClient,
        singleAssetData,
        investmentFrequency
    };
};
