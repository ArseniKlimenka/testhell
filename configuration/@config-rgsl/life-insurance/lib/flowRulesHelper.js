'use strict';

const dateUtils = require('@config-system/infrastructure/lib/DateUtilsCore');
const KPKHelper = require("@config-rgsl/party/lib/KPKHelper");
const { issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = {

    /**
     * @desc Checks if exists trigger on defined departament. If departament is undefined then checks any trigger.
     * @param {object} body document body
     * @param {string} departament Code of Payment Frequency from table
     * @returns {boolean}
     */
    existsTrigger: function (body, departament = undefined, triggerName = undefined) {

        const uwTriggers = body?.uwTriggers ?? [];
        if (uwTriggers.length == 0) {
            return false;
        }

        if (departament && !triggerName) {
            return body.uwTriggers.some(element => element.departament == departament);
        }

        if (!departament && triggerName) {
            return body.uwTriggers.some(element => element.triggerName == triggerName);
        }

        if (departament && triggerName) {
            return body.uwTriggers.some(element => element.departament == departament && element.triggerName == triggerName);
        }

        return true;


    },

    /**
     * @desc Checks if exists attachment of defined type
     * @param {object} body document body
     * @param {string} entityId id of entity from which ned to check attachment
     * @param {string} attachmentType attachment type
     * @returns {boolean}
     */
    existsAttachment: function (body, entityId, attachmentType) {

        const attachmentsPackage = body?.attachmentsPackage ?? [];
        if (attachmentsPackage.length == 0 || !entityId || !attachmentType) { return false; }

        return attachmentsPackage.some(item => item.entityId == entityId && item.attachmentType == attachmentType);

    },

    /**
     * @desc Calculate sum of payment lines
     * @param {object} body document body
     * @returns {number}
     */
    getPaymentLinesSum: function (body) {
        if (!body) { return 0; }
        const paymentLines = body?.paymentAmendmentConditions?.paymentLines ?? [];
        const paymentLinesSum = paymentLines.reduce((acc, v) => { acc += v.paymentLineSum; return acc; }, 0);
        return paymentLinesSum;
    },

    /**
     * @desc Checks policy holder and insured person by KPK
     * @param {object} input input from actionToRunBefore
     * @param {object} ambientProperties ambientProperties
     * @returns {array} check messages array
     */
    checkKPK: async function (input, ambientProperties) {

        const result = [];

        const body = input?.context?.Body;

        const policyHolderData = body?.policyHolder?.partyData;
        const polilcyHolderPartyId = policyHolderData?.partyId;
        const polilcyHolderPartyBody = policyHolderData?.partyBody;
        const polilcyHolderPartyFullName = policyHolderData?.partyFullName;
        const polilcyHolderPartyCode = policyHolderData?.partyCode;

        const insuredPersonData = body?.insuredPersonData?.partyData;
        const insuredPersonPartyId = insuredPersonData?.partyId;
        const insuredPersonPartyBody = insuredPersonData?.partyBody;
        const insuredPersonPartyFullName = insuredPersonData?.partyFullName;
        const insuredPersonPartyCode = insuredPersonData?.partyCode;
        const isPolicyHolder = body?.insuredPerson.isPolicyHolder;

        const issueFormCode = body?.issueForm?.code?.issueFormCode;

        const document = {
            entityId: input?.rootContext?.Id,
            DocumentNumber: input?.rootContext?.Number,
            Representation: "Договор " + input?.rootContext?.Number,
            issueDate: body?.policyTerms?.startDate,
            endDate: body?.policyTerms?.endDate,
            productDescription: body?.mainInsuranceConditions?.insuranceProduct?.productDescription,
            productCode: body?.mainInsuranceConditions?.insuranceProduct?.productCode
        };

        if (polilcyHolderPartyId) {

            document.role = "Клиент";
            document.partyId = polilcyHolderPartyId;
            document.fullName = polilcyHolderPartyFullName;
            document.partyCode = polilcyHolderPartyCode;

            const phContractorsResult = await KPKHelper.getContractors(polilcyHolderPartyBody, ambientProperties, document);

            if (phContractorsResult.Error) {
                result.push("Ошибка сервиса КПК. Обратитесь в службу технической поддержки по адресу adinsure_support@rgsl.ru");
            }
            else if (phContractorsResult.Reject || ["НаСогласовании", "НеСогласован"].includes(phContractorsResult.Agreement)) {
                result.push("Проверка КПК не пройдена для Cтрахователя: " + phContractorsResult.Reason);
                await KPKHelper.setNaturalPersonPodFt(policyHolderData, ambientProperties);
            }

            const phBlackListResult = await KPKHelper.checkBlackList(polilcyHolderPartyBody, ambientProperties, document);
            if (phBlackListResult.Error) {
                result.push("Ошибка сервиса проверки ЧС. Обратитесь в службу технической поддержки по адресу adinsure_support@rgsl.ru");
            }
            else if (phBlackListResult.Reject
                || phBlackListResult.Agreement.indexOf("Контрагент входит в ЧС. Идет согласование") != -1
                || phBlackListResult.Agreement.indexOf("Контрагент входит в ЧС. Действие запрещено") != -1) {
                result.push("Проверка ЧС не пройдена для Страхователя: " + phBlackListResult.Agreement);
            }

            const hasEmailBlackList = await KPKHelper.checkEmailBlackList(polilcyHolderPartyBody, ambientProperties);
            if (hasEmailBlackList && issueFormCode == issueForm.ePolicy.issueFormCode) {
                result.push("Email страхователя находится в чёрном списке! Необходимо выпустить бумажный полис!");
            }
        }

        if (insuredPersonPartyId && !isPolicyHolder) {

            document.role = "Иное";
            document.partyId = insuredPersonPartyId;
            document.fullName = insuredPersonPartyFullName;
            document.partyCode = insuredPersonPartyCode;

            const insuredContractorsResult = await KPKHelper.getContractors(insuredPersonPartyBody, ambientProperties, document);

            if (insuredContractorsResult.Reject || ["НаСогласовании", "НеСогласован"].includes(insuredContractorsResult.Agreement)) {
                result.push("Проверка КПК не пройдена для Застрахованного: " + insuredContractorsResult.Reason);
                await KPKHelper.setNaturalPersonPodFt(insuredPersonData, ambientProperties);
            }

            const insuredBlackListResult = await KPKHelper.checkBlackList(insuredPersonPartyBody, ambientProperties, document);
            if (insuredBlackListResult.Reject
                || insuredBlackListResult.Agreement.indexOf("Контрагент входит в ЧС. Идет согласование") != -1
                || insuredBlackListResult.Agreement.indexOf("Контрагент входит в ЧС. Действие запрещено") != -1) {
                result.push("Проверка ЧС не пройдена для Застрахованного: " + insuredBlackListResult.Agreement);
            }

            const hasEmailBlackList = await KPKHelper.checkEmailBlackList(insuredPersonPartyBody, ambientProperties);
            if (hasEmailBlackList && issueFormCode == issueForm.ePolicy.issueFormCode) {
                result.push("Email застрахованного находится в чёрном списке! Необходимо выпустить бумажный полис!");
            }
        }

        return result;
    },

    /**
     * @desc Checks if document was in Active status
     * @param {object} commonBody document commonBody
     * @returns {boolean}
     */
    wasActive: function (commonBody) {
        const wasActive = commonBody?.transitionResult?.attributes?.wasActive ?? false;
        return wasActive;
    },

    /**
     * @desc Checks if document has allocations
     * @param {object} body document body
     * @returns {boolean}
     */
    hasAllocations: function (body) {
        const allocationInformation = body?.allocationInformation ?? [];
        const hasAllocations = allocationInformation.length > 0;
        return hasAllocations;
    },

    /**
     * @desc Checks if document can be completed now
     * @param {object} body document body
     * @returns {boolean}
     * @errorCode {errorCode} Activated_to_Completed_NotBeCompleted
     */
    notBeCompleted: function (input, validationErrors) {
        const contractEndDate = input.externalData?.lastContractData?.endDate;
        const notBeCompleted = !contractEndDate || dateUtils.isAfterOrEqual(contractEndDate, dateUtils.todayAsString());


        if (notBeCompleted) {
            validationErrors.push({
                errorCode: 'Activated_to_Completed_NotBeCompleted',
            });
        }

        return notBeCompleted;
    },

    /**
     * Returns triggers count
     * @param {object} body document body
     * @returns {number}
     */
    getTriggersCount: function (body) {

        const triggersCount = body?.uwTriggers ?? [];
        return triggersCount.length;
    }
};
