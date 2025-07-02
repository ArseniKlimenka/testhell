+'use strict';

const {
    formatDateTimeToString,
    getCaseStringFromNumber
} = require('@config-rgsl/infrastructure/lib/FormatUtils');

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const {
    finKnowledge2023ActualDate,
    finKnowledge2024ActualDate
} = require('@config-rgsl/party/lib/partyQuestionnairesConstants');
const {
    product
} = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    // policy holder party data
    const policyHolderFullName = input.body.policyHolder?.partyData?.partyFullName;
    const policyHolderDateOfBirth = formatDateTimeToString(input.body.policyHolder?.partyData?.dateOfBirth);

    // product specific data
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;
    const isFinKnowledgeQuestionnaireBefore2023 = dateTimeUtils.isBefore(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate(finKnowledge2023ActualDate));
    const isFinKnowledgeQuestionnaireBefore2024 = dateTimeUtils.isBefore(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate(finKnowledge2024ActualDate));

    let finKnowledgeQuestionnaire = [];
    if (isFinKnowledgeQuestionnaireBefore2023) {
        finKnowledgeQuestionnaire = input.body.policyHolder?.partyData?.partyBody?.finKnowledgeQuestionnaire?.questionnaire ?? [];
    }
    else if (isFinKnowledgeQuestionnaireBefore2024) {
        finKnowledgeQuestionnaire = input.body.policyHolder?.partyData?.partyBody?.finKnowledgeQuestionnaire2023?.questionnaire ?? [];
    } else {
        finKnowledgeQuestionnaire = input.body.policyHolder?.partyData?.partyBody?.finKnowledgeQuestionnaire2024?.questionnaire ?? [];
    }

    finKnowledgeQuestionnaire.forEach(item => {
        if (item.itemConfirmation === true) {
            item.yes = true;
        }
        if (item.itemConfirmation === false) {
            item.no = true;
        }
    });
    const allAnswersNo = !finKnowledgeQuestionnaire.some(item => item.itemConfirmation === true);
    const productConf = input.body?.productConfiguration ?? {};
    const coolOffPeriodDays = productConf.coolOffPeriodDays;
    const coolOffPeriodDaysTextGenitive = getCaseStringFromNumber(coolOffPeriodDays, 'genitive');
    const coolOffPeriod = `${coolOffPeriodDays || ''} (${coolOffPeriodDaysTextGenitive})`;
    const partnerInfo = printoutsHelper.getBankInfoByBody(input.body);
    const isNOTE1BFKO = productCode == product.NOTE1BFKO;
    const isNOTEV3BFKO = productCode == product.NOTEV3BFKO;
    const isNOTE1Year = [product.NOTE1BFKO, product.NOTE1BFKO3, product.NOTE1BFKO4].includes(productCode);

    const isBasisAvtiveVTB = [product.IBAP3VTB, product.IBAP5VTB, product.IBAV3VTB, product.IBAV5VTB].includes(productCode);

    // page content data
    const topLeftContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'top-left' + '{' +
        'content: url("./img/logoHeader.png");' +
        '}' +
        '}' +
        '</style>';

    const bottomLeftContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'bottom-left' + '{' +
        'color: gray;' +
        'font-size: 7pt;' +
        'white-space: pre-line;' +
        'content: "ООО СК «Росгосстрах Жизнь» 121059, г. Москва, вн.тер.г. муниципальный округ\\A Дорогомилово, ул. Киевская, д. 7, к. 1. Лицензии Банка России: СЖ № 3879, СЛ № 3879\\A ИНН 7743504307. ОГРН 1037739821514";' +
        '}' +
        '}' +
        '</style>';

    const bottomRightContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'bottom-right' + '{' +
        'color: IndianRed;' +
        'font-size: 12pt;' +
        'white-space: pre-line;' +
        'content: "RGSL.RU\\A 8-800-100-12-10";' +
        '}' +
        '}' +
        '</style>';

    const output = {
        policyHolderFullName,
        policyHolderDateOfBirth,
        finKnowledgeQuestionnaire,
        allAnswersNo,
        coolOffPeriod,
        topLeftContent,
        bottomLeftContent,
        bottomRightContent,
        isNOTE1BFKO,
        isNOTE1Year,
        isNOTEV3BFKO,
        isBasisAvtiveVTB,
        partnerInfo
    };

    return output;
};
