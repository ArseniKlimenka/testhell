const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const {
    checkAvailabilitySome
} = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

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
    const creditProgramId = body.creditProgram.creditProgramId;
    let numberOfProgram;
    if (body.risks.some(item => item.risk.riskCode == 'DI1005042204')) {
        numberOfProgram = 1;
    }
    if (body.risks.some(item => item.risk.riskCode == 'DI10010042204')) {
        numberOfProgram = 2;
    }
    if (body.risks.some(item => item.risk.riskCode == 'DI12012042204')) {
        numberOfProgram = 3;
    }
    const risk = printoutsHelper.getRisk(body, body.risks, productCode, numberOfProgram);
    const {
        frequency
    } = printoutsHelper.getFrequency(body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(body);
    const basicConditions = body.basicConditions;
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isOffer = issueFormCode == 'offer';
    if (isOffer) {
        holder.signatureName = '';
    }
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder({
        issueDate: basicConditions.issueDate,
        isOffer: issueFormCode == 'offer',
        isPolicyHolder: true
    });

    const isAfter20220915 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-09-15'));
    const isAfter20221024 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-24'));
    const isAfter20221219 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-12-19'));
    const isBefore20221219 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-12-19'));
    const isBefore20221024 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-24'));

    const existsJL = risk.mandatory.some(item => item.riskCode == 'JL42204');
    if (existsJL) {
        const limitJL = FormatUtils.formatNumberToMoney(body.creditContract.annuityPaymentSum * 1.15);
        if (isAfter20220915) {
            risk.mandatory.find(item => item.riskCode == 'JL42204').insurancePayment = 'в соответствии с п. 10.7 Правил, но не более максимального лимита ежемесячной страховой выплаты – ' + limitJL + ' рублей';
        } else {
            risk.mandatory.find(item => item.riskCode == 'JL42204').insurancePayment = 'в соответствии с п. 10.4 Правил, но не более максимального лимита ежемесячной страховой выплаты – ' + limitJL + ' рублей';
        }
    }

    const existsIN = risk.mandatory.some(item => item.riskCode == 'I42204');
    if (existsIN) {
        if (isAfter20221024) {
            risk.mandatory.find(item => item.riskCode == 'I42204').insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (Приложение №3 к Правилам)';
        } else if (isAfter20220915) {
            risk.mandatory.find(item => item.riskCode == 'I42204').insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (Приложение №2 к Правилам), но не более 1 500 000,00 рублей';
        } else {
            risk.mandatory.find(item => item.riskCode == 'I42204').insurancePayment = '100% страховой суммы, но не бо-лее 1 500 000,00 рублей ';
        }
    }

    const programSJ21 = checkAvailabilitySome([creditProgramId],
        ['п00332022', 'п00422022', 'п00462022', 'п00472022', 'п00512022', 'п00532022', 'п00572022', 'п00582022', 'п00602022', 'п00652022', 'п00662022', 'п00672022', // CMP3
            'п00892022', 'п00982022', 'п01022022', 'п01032022', 'п01072022', 'п01092022', 'п01132022', 'п01142022', 'п01162022', 'п01212022', 'п01222022', 'п01232022' // CMP4
        ]);
    if (programSJ21 && isAfter20221024) {
        const existsHO = risk.mandatory.some(item => item.riskCode == 'HA42204');
        if (existsHO) {
            risk.mandatory.find(item => item.riskCode == 'HA42204').insurancePayment = '0,1% от страховой суммы за каждый день стационарного лечения, начиная с 7-го дня, но не более 30 дней';
        }
    }

    const risk1 = risk.mandatory.slice(0, 1);
    const risk2 = risk.mandatory.slice(1, 2);
    const risk3Exists = risk.mandatory.length >= 3;
    const risk3 = risk3Exists && risk.mandatory.slice(2, 3);
    const risk3IsCD = risk3Exists && risk.mandatory.some(item => item.riskCode == 'CD42204');
    const risk4Exists = risk.mandatory.length >= 4;
    const risk4 = risk4Exists && risk.mandatory.slice(3, 4);
    const risk5Exists = risk.mandatory.length >= 4;
    const risk5 = risk5Exists && risk.mandatory.slice(4, 5);

    const riskSJ1 = isBefore20221024 || risk.mandatory.some(item => item.riskCode == 'DIL42204') || risk.mandatory.some(item => item.riskCode == 'DNST42204');
    const programSJ10 = checkAvailabilitySome([creditProgramId],
        ['п0012022', 'п0042022', 'п0072022', 'п0082022', 'п0092022', 'п0102022', 'п0112022', 'п0122022', 'п0132022', // CMP
            'п00282022', 'п00382022', 'п00392022', 'п00402022', 'п00412022', 'п00422022', // CMP3
            'п00842022', 'п00942022', 'п00952022', 'п00962022', 'п00972022', 'п00982022' // CMP4
        ]);
    const programSJ20 = checkAvailabilitySome([creditProgramId],
        ['п0022022', 'п0052022', 'п0142022', 'п0152022', 'п0162022', 'п0172022', 'п0182022', 'п0192022', 'п0202022', // CMP
            'п00292022', 'п00432022', 'п00442022', 'п00452022', 'п00462022', // CMP3
            'п00852022', 'п00992022', 'п01002022', 'п01012022', 'п01022022' // CMP4
        ]);
    const programSJ30 = checkAvailabilitySome([creditProgramId],
        ['п0032022', 'п0062022', 'п0212022', 'п0222022', 'п0232022', 'п0242022', 'п0252022', 'п0262022', 'п0272022', // CMP
            'п00302022', 'п00472022', 'п00482022', 'п00492022', 'п00502022', 'п00512022', 'п00522022', // CMP3
            'п00862022', 'п01032022', 'п01042022', 'п01052022', 'п01062022', 'п01072022', 'п01082022' // CMP4
        ]);
    const programSJ40 = checkAvailabilitySome([creditProgramId],
        ['п0042022', 'п0072022', 'п0082022', 'п0092022', 'п0102022', 'п0112022', 'п0122022', 'п0132022', // CMP
            'п00312022', 'п00532022', 'п00542022', 'п00552022', 'п00562022', 'п00572022', 'п00582022', 'п00592022', // CMP3
            'п00872022', 'п01092022', 'п01102022', 'п01112022', 'п01122022', 'п01132022', 'п01142022', 'п01152022' // CMP4
        ]);
    const programSJ50 = checkAvailabilitySome([creditProgramId],
        ['п0052022', 'п0142022', 'п0152022', 'п0162022', 'п0172022', 'п0182022', 'п0192022', 'п0202022', // CMP
            'п00322022', 'п00602022', 'п00612022', 'п00622022', 'п00632022', 'п00642022', 'п00652022', 'п00662022', 'п00672022', 'п00682022', 'п00692022', 'п00702022', // CMP3
            'п00882022', 'п01162022', 'п01172022', 'п01182022', 'п01192022', 'п01202022', 'п01212022', 'п01222022', 'п01232022', 'п01242022', 'п01252022', 'п01262022' // CMP4
        ]);


    const isBetween20220701And20220914 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-07-01'))
        && dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-09-15'));
    const isBetween20220915And20221007 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-09-15'))
        && dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-08'));
    const isBetween20221024And20221218 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-10-24'))
        && dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-12-19'));
    const isBetween20230301And20230331 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-03-01'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-03-31'));
    const isBetween20230401And20231102 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-04-01'))
        && dateHelper.isBeforeOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-11-02'));

    const CMPFirst = (productCode == 'CMP') && isBetween20220701And20220914;
    const CMPSecond = (productCode == 'CMP') && isBetween20220915And20221007;
    const CMP3First = (productCode == 'CMP3') && isBetween20221024And20221218;
    const CMP4First = (productCode == 'CMP4') && isBetween20230301And20230331;
    const CMP4Second = (productCode == 'CMP4') && isBetween20230401And20231102;
    if (CMPFirst) {
        if (existsJL) {
            risk.mandatory.find(item => item.riskCode == 'JL42204').insuranceRisks = 'Дожитие Застрахованного до недобровольной потери работы';
        }
        if (existsIN) {
            risk.mandatory.find(item => item.riskCode == 'I42204').insuranceRisks = 'Травма Застрахованного в результате несчастного случая';
        }
    }
    if (CMPSecond) {
        policy.rule = 'Правил страхования жизни физических лиц №9 (в редакции от 15 августа 2022 года)';
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
        risk1,
        risk2,
        risk3Exists,
        risk3,
        risk3IsCD,
        risk4Exists,
        risk4,
        risk5Exists,
        risk5,
        isAfter20220915,
        isAfter20221024,
        isAfter20221219,
        isBefore20221219,
        riskSJ1,
        programSJ10,
        programSJ20,
        programSJ30,
        programSJ40,
        programSJ50,
        CMPFirst,
        CMPSecond,
        CMP3First,
        CMP4First,
        CMP4Second
    };

    // KID printout section
    printoutsHelper.activateKidCreditPrintoutForPaper(input, output, this, '2022-10-24');

    return output;
};
