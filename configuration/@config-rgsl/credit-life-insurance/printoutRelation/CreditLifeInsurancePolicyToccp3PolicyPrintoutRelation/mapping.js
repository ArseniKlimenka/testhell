const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const body = input.body;

    const {
        policy,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    const {
        personalAcc,
        bankName,
        city,
        correspAcc,
        bic
    } = printoutsHelper.getBankInfoByBody(body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;

    let numberOfProgram;

    if (body.risks.some(item => item.risk.riskCode == 'DA1005042204')) {
        numberOfProgram = 1;
    }

    if (body.risks.some(item => item.risk.riskCode == 'DA10010042204')) {
        numberOfProgram = 2;
    }

    if (body.risks.some(item => item.risk.riskCode == 'DA12012042204')) {
        numberOfProgram = 3;
    }

    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const { frequency } = printoutsHelper.getFrequency(body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(body);
    const basicConditions = body.basicConditions;
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isOffer = issueFormCode == 'offer';
    if (isOffer) {
        holder.signatureName = '';
    }
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(({
        issueDate: basicConditions.issueDate,
        isOffer: issueFormCode == 'offer',
        isPolicyHolder: true
    }));
    const creditDate = body.creditContract.creditDate ? dateHelper.formatDate(body.creditContract.creditDate, dateHelper.DateFormats.CALENDAR) : '';
    const creditContractNumber = body.creditContract.creditContractNumber ? body.creditContract.creditContractNumber : '';
    const existsJL = risk.mandatory.some(item => item.riskCode == 'JL42204');
    const limitJL = FormatUtils.formatNumberToMoney(body.creditContract.annuityPaymentSum * 1.15);

    const risk1 = risk.mandatory.slice(0, 1);
    const risk2 = risk.mandatory.slice(1, 2);
    const risk3Exists = risk.mandatory.length >= 3;
    const risk3 = risk3Exists && risk.mandatory.slice(2, 3);
    const risk3IsCD = risk3Exists && risk.mandatory.some(item => item.riskCode == 'CD42204');
    const risk4Exists = risk.mandatory.length >= 4;
    const risk4 = risk4Exists && risk.mandatory.slice(3, 4);

    const isAfter20221008 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-08'));
    const isBefore20220701OrisBetween20220810And20221024 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-07-01')) ||
        (dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-08')) &&
            dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-24')));
    const isBefore20220701 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-07-01'));
    const isBefore20221219 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-12-19'));
    const isAfter20221024 = dateHelper.isAfter(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-24'));
    const isAfter20221219 = dateHelper.isAfter(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-12-19'));

    const isBetween20220221And20220630 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-02-21'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-06-30'));
    const isBetween20220701And202200914 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-07-01'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-09-14'));
    const isBetween20221008And20221023 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-08'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-23'));
    const isBetween20221024And20221218 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-24'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-12-18'));
    const isBetween20221219And20230331 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-12-19'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-03-31'));
    const isBetween20230401And20231102 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-04-01'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-11-02'));

    const CCPFirst = (productCode == 'CCP') && isBetween20220221And20220630;
    const CCPSecond = (productCode == 'CCP') && isBetween20220701And202200914;
    const CCPThird = (productCode == 'CCP') && isBetween20221008And20221023;
    const CCP2First = (productCode == 'CCP2') && isBetween20221008And20221023;
    const CCPFourth = (productCode == 'CCP') && isBetween20221024And20221218;
    const CCP3First = (productCode == 'CCP3') && isBetween20221024And20221218;
    const CCP3Second = (productCode == 'CCP3') && isBetween20221219And20230331;
    const CCP3Third = (productCode == 'CCP3') && isBetween20230401And20231102;


    if (CCPSecond) {
        const existDeath = risk.mandatory.some(item => item.riskCode == 'DLP42204');
        const existInj = risk.mandatory.some(item => item.riskCode == 'D42204');
        if (existDeath) {
            risk.mandatory.find(item => item.riskCode == 'DLP42204').insuranceRisks = 'Смерть Застрахованного в результате несчастного случая';
            risk.mandatory.find(item => item.riskCode == 'DLP42204').insurancePayment = '100% страховой суммы, но не более 5 000 000,00 рублей ';
        }
        if (existInj) {
            risk.mandatory.find(item => item.riskCode == 'D42204').insuranceRisks = 'Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая';
            risk.mandatory.find(item => item.riskCode == 'D42204').insurancePayment = '100% страховой суммы при установлении I группы инвалидности, 50% страховой суммы при установлении II группы инвалидности, но не более 5 000 000,00 рублей';
        }
    }

    if (CCP3First || CCP3Second) {
        const existInjTab = risk.mandatory.some(item => item.riskCode == 'DT42204');
        if (existInjTab) {
            risk.mandatory.find(item => item.riskCode == 'DT42204').insuranceRisks = 'Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине';
        }
    }
    if (CCPFourth || CCP2First || CCPThird) {
        policy.rule = 'Правил страхования жизни физических лиц №9 (в редакции от 01 октября 2022 года)';
    }
    if (CCP3Third) {
        policy.rule = 'Правил страхования жизни физических лиц №9 (в редакции от 01 апреля 2023 года)';
    }

    const output = {
        policy,
        experationDate,
        bankInfo,
        insurer,
        holder,
        risk,
        frequency,
        insuranceTerms,
        bottomRightContentHolder,
        bottomLeftContentHolder,
        isOffer,
        creditDate,
        creditContractNumber,
        existsJL,
        limitJL,
        risk1,
        risk2,
        risk3Exists,
        risk3,
        risk3IsCD,
        risk4Exists,
        risk4,
        isAfter20221008,
        isAfter20221024,
        isAfter20221219,
        isBefore20220701OrisBetween20220810And20221024,
        isBefore20220701,
        isBefore20221219,
        CCPFirst,
        CCPSecond,
        CCPThird,
        CCP2First,
        CCPFourth,
        CCP3First,
        CCP3Second,
        CCP3Third
    };

    // KID printout section
    printoutsHelper.activateKidCreditPrintoutForPaper(input, output, this, '2022-10-08');


    return output;
};
