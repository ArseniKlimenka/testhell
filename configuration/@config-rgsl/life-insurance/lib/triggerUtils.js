const { translationUtils } = require('@adinsure/runtime');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { isNoteProduct, checkDRPKCommissionIncrease } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { paymentFrequency, productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { productGroupArray, product, issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { setCumulationTriggers } = require('@config-rgsl/life-insurance/lib/cumulationHelper');
const { getCashBackCoeff } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');
const { RPFaddressType } = require('@config-rgsl/infrastructure/lib/AddressConstants');

module.exports = {
    getBodyContext: function (body) {
        const declarationMedical = body.declarationMedical;
        const declarationMedical2 = body.declarationMedicalPolicyHolder;
        const declarationMain = body.declarationMain;
        const declarationSport = body.declarationSport;

        let declarationMedicalInsuredPerson = [];
        let declarationMedicalPolicyHolder = [];
        let declarationMainPolicyHolder = [];
        let declarationMainInsuredPerson = [];
        let declarationSportInsuredPerson = [];

        if (declarationMedical) {
            declarationMedicalInsuredPerson = declarationMedical
                .filter(element => element.agreement == false)
                .sort((a, b) => a.itemNumber - b.itemNumber);
        }
        if (declarationMedical2) {
            declarationMedicalPolicyHolder = declarationMedical2
                .filter(element => element.agreement == false)
                .sort((a, b) => a.itemNumber - b.itemNumber);
        }
        if (declarationMain) {
            declarationMainPolicyHolder = declarationMain
                .filter(element => element.agreementPolicyHolder == false)
                .sort((a, b) => a.itemNumber - b.itemNumber);
            declarationMainInsuredPerson = declarationMain
                .filter(element => element.agreementInsuredPerson == false)
                .sort((a, b) => a.itemNumber - b.itemNumber);
        }
        if (declarationSport) {
            declarationSportInsuredPerson = declarationSport
                .filter(element => element.agreementInsuredPerson == false)
                .sort((a, b) => a.itemNumber - b.itemNumber);
        }

        const policyHolderPartyCode = body.policyHolder?.partyData?.partyCode;
        const policyHolderPartyBody = body.policyHolder?.partyData?.partyBody ?? {};
        const insuredPersonPartyCode = body.insuredPerson?.partyData?.partyCode;
        const insuredPersonPartyBody = body.insuredPerson?.partyData?.partyBody ?? {};
        const isPolicyHolder = body.insuredPerson?.isPolicyHolder ?? false;

        const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        const salesSegment = body.mainInsuranceConditions?.insuranceProduct?.salesSegment;
        const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
        const currencyCode = body.basicConditions?.currency?.currencyCode;
        const riskPremium = body.basicConditions?.riskPremium;
        const issueDate = body.basicConditions?.issueDate;
        const endDate = body.policyTerms?.endDate;
        const productGroup = body.mainInsuranceConditions?.insuranceProduct?.productGroup;
        const isRiskProductGroup = productGroup == 'risk';

        const productConf = body?.productConfiguration ?? {};
        const maxPremiumMandatoryAgreement = productConf.maxPremiumMandatoryAgreement && productConf.maxPremiumMandatoryAgreement[currencyCode];
        const maxPremium = productConf.maxPremium && productConf.maxPremium[currencyCode];
        const insuredAgeOnStartDateMandatoryAgreement = productConf.insuredAgeOnStartDateMandatoryAgreement;
        const insuredAgeOnStartDateMax = productConf.insuredAgeOnStartDateMax && productConf.insuredAgeOnStartDateMax[paymentFrequencyCode];
        const isVIPVTBSegment = salesSegment == 'VIPVTB';
        const isVIPVTBNTSegment = salesSegment == 'VIPVTBNT';
        const isPremiumVTBSegment = salesSegment == 'PremiumVTB';
        const isMassPBSegment = salesSegment == 'massPB';

        const insuredAgeOnEndDateMaxMandatoryAgreement = productConf.insuredAgeOnEndDateMaxMandatoryAgreement;
        const insuredAgeOnEndDateMax = productConf.insuredAgeOnEndDateMax && productConf.insuredAgeOnEndDateMax[paymentFrequencyCode];

        const maxInsuredSumMainRiskMandatoryAgreement = productConf.maxInsuredSumMainRiskMandatoryAgreement;
        const maxInsuredSumMainRisk = productConf.maxInsuredSumMainRisk;
        const risks = body.risks ?? [];
        const mainRisk = risks.find(r => ['E36102', 'E36404'].includes(r.risk.riskCode));
        const mainRiskInsuredSum = mainRisk && mainRisk.riskInsuredSum;

        const paymentPlan = body.paymentPlan ?? [];
        let risksPremiumSum = 0;
        if (riskPremium > 0) {
            risksPremiumSum = riskPremium;
        }
        else if (paymentPlan.length > 0 && paymentPlan[0].paymentSum > 0) {
            risksPremiumSum = paymentPlan[0].paymentSum;
        }

        const riskDLP36404 = risks.find(item => item.risk.riskCode == 'DLP36404');
        const riskDLP36404InsuredSum = riskDLP36404?.riskInsuredSum ?? 0;

        const riskDLP36904 = risks.find(item => item.risk.riskCode == 'DLP36904');
        const riskDLP36904InsuredSum = riskDLP36904?.riskInsuredSum ?? 0;

        const riskDLPSS36404 = risks.find(item => item.risk.riskCode == 'DLPSS36404');
        const riskDLPSS36404InsuredSum = riskDLPSS36404?.riskInsuredSum ?? 0;

        const riskDNS36404 = risks.find(item => item.risk.riskCode == 'DNS36404');
        const riskDNS36404InsuredSum = riskDNS36404?.riskInsuredSum ?? 0;

        const riskDLP42204 = risks.find(item => item.risk.riskCode == 'DLP42204');
        const riskDLP42204InsuredSum = riskDLP42204?.riskInsuredSum ?? 0;

        const riskDNS42204 = risks.find(item => item.risk.riskCode == 'DNS42204');
        const riskDNS42204InsuredSum = riskDNS42204?.riskInsuredSum ?? 0;

        const riskDTP42204 = risks.find(item => item.risk.riskCode == 'DTP42204');
        const riskDTP42204InsuredSum = riskDTP42204?.riskInsuredSum ?? 0;

        const riskDLPDPE36404 = risks.find(item => item.risk.riskCode == 'DLPDPE36404');
        const riskDLPDPE36404InsuredSum = riskDLPDPE36404?.riskInsuredSum;

        const riskD36404 = risks.find(item => item.risk.riskCode == 'D36404');
        const riskD36404InsuredSum = riskD36404?.riskInsuredSum;

        const riskDA36404 = risks.find(item => item.risk.riskCode == 'DA36404');
        const riskDA36404InsuredSum = riskDA36404?.riskInsuredSum;

        const riskDLP36914 = risks.find(item => item.risk.riskCode == 'DLP36914');
        const riskDLP36914InsuredSum = riskDLP36914?.riskInsuredSum;

        const riskDNS36414 = risks.find(item => item.risk.riskCode == 'DNS36414');
        const riskDNS36414InsuredSum = riskDNS36414?.riskInsuredSum;

        const maxInsuredSum = risks.reduce((acc, v) => { if (acc < v.riskInsuredSum) { acc = v.riskInsuredSum; } return acc; }, 0);
        const holderAgeOnStartDateMax = productConf.holderAgeOnStartDateMax;
        const holderAgeOnStartDateMaxMandatoryAgreement = productConf.holderAgeOnStartDateMaxMandatoryAgreement;

        const insuranceTerms = body.basicConditions?.insuranceTerms;

        return {
            declarationMedicalInsuredPerson,
            declarationMedicalPolicyHolder,
            declarationMainPolicyHolder,
            declarationMainInsuredPerson,
            declarationSportInsuredPerson,
            policyHolderPartyCode,
            policyHolderPartyBody,
            insuredPersonPartyCode,
            insuredPersonPartyBody,
            isPolicyHolder,
            productCode,
            paymentFrequencyCode,
            currencyCode,
            riskPremium,
            issueDate,
            endDate,
            maxPremiumMandatoryAgreement,
            maxPremium,
            insuredAgeOnStartDateMandatoryAgreement,
            insuredAgeOnStartDateMax,
            risksPremiumSum,
            insuredAgeOnEndDateMaxMandatoryAgreement,
            insuredAgeOnEndDateMax,
            maxInsuredSumMainRiskMandatoryAgreement,
            maxInsuredSumMainRisk,
            mainRiskInsuredSum,
            maxInsuredSum,
            riskDLP36404InsuredSum,
            riskDLP36904InsuredSum,
            riskDLPSS36404InsuredSum,
            riskDNS36404InsuredSum,
            riskDLP42204InsuredSum,
            riskDNS42204InsuredSum,
            riskDTP42204InsuredSum,
            riskDLPDPE36404InsuredSum,
            riskD36404InsuredSum,
            riskDA36404InsuredSum,
            riskDLP36914InsuredSum,
            riskDNS36414InsuredSum,
            holderAgeOnStartDateMax,
            holderAgeOnStartDateMaxMandatoryAgreement,
            productGroup,
            isRiskProductGroup,
            salesSegment,
            isVIPVTBSegment,
            isVIPVTBNTSegment,
            isPremiumVTBSegment,
            isMassPBSegment,
            insuranceTerms
        };
    },

    setTriggers: function (body, isCollectivePolicy) {

        const triggersConditions = this.getBodyContext(body);

        if (isCollectivePolicy) {
            setTriggersCollectivePolicy(body, triggersConditions);
        }
        else {
            setTriggersSinglePolicy(body, triggersConditions);
        }

        function setTriggersCollectivePolicy(body, triggersConditions) {

            const areConditionsChanged = !objectUtils.objectComparison(triggersConditions, body.triggersConditions || {});

            if (!areConditionsChanged) { return; }
            body.triggersConditions = triggersConditions;

            body.uwTriggers = [];

            const partyCode = body.policyHolder?.partyData?.partyCode;
            if (!partyCode) {
                return;
            }

            const partyType = body.policyHolder?.partyData?.partyType;
            const policyHolderPartyBody = body.policyHolder?.partyData?.partyBody ?? {};
            const objectName = "Страхователь";
            const departament = "compliance";
            const confirmationDepartment = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);
            let triggerName = "";

            const hasWebsite = policyHolderPartyBody?.partyOrganisationData?.site?.hasWebsite ?? false;
            if (hasWebsite) {
                triggerName = "Web site";
                pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
            }

            const isNonResidentSEA = policyHolderPartyBody?.partyOrganisationData?.soleExecutiveAuthority?.partyBody?.partyGeneralData?.isNonResident ?? false;
            if (isNonResidentSEA) {
                triggerName = "ЕИО нерезидент";
                pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
            }

            const hasLicenses = policyHolderPartyBody?.partyLicensesAdditionalInfo?.hasLicenses ?? false;
            if (hasLicenses) {
                triggerName = "Наличие лицензии на право осуществления деятельности, подлежащей лицензированию";
                pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
            }

            // check policy holder
            if (partyType == 'NaturalPerson') {
                checkParty(body, policyHolderPartyBody, objectName);
            }
            else {
                const isNonResident = policyHolderPartyBody?.partyGeneralData?.isNonResident ?? false;
                triggerName = "Нерезидент РФ";
                if (isNonResident) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }
            }

            // check manual address
            const partyAddresses = policyHolderPartyBody?.partyAddresses ?? [];
            const existsManualAddress = partyAddresses
                ?.filter(item => item.addressType && RPFaddressType.includes(item.addressType.addressTypeCode))
                ?.some(item => item.isManualAddress);
            if (existsManualAddress) {
                triggerName = "Ручной адрес регистрации, места фактического проживания или почтового адреса";
                pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
            }
        }

        function setTriggersSinglePolicy(body, triggersConditions) {

            const areConditionsChanged = !objectUtils.objectComparison(triggersConditions, body.triggersConditions || {});

            if (!areConditionsChanged) { return; }
            body.triggersConditions = triggersConditions;

            body.uwTriggers = [];

            /* declarations triggers */

            const triggersResultText = {
                declarationMedicalInsuredPerson: {
                    objectName: 'Декларация о состоянии здоровья и факторах риска застрахованного',
                    triggerName: 'Согласие застрахованного = Нет'
                },
                declarationMedicalPolicyHolder: {
                    objectName: 'Декларация о состоянии здоровья и факторах риска страхователя (застрахованного 2)',
                    triggerName: 'Согласие страхователя (застрахованного 2) = Нет'
                },
                declarationMainPolicyHolder: {
                    objectName: 'Декларация страхователя и застрахованного',
                    triggerName: 'Согласие страхователя = Нет'
                },
                declarationMainInsuredPerson: {
                    objectName: 'Декларация страхователя и застрахованного',
                    triggerName: 'Согласие застрахованного = Нет'
                },
                declarationSportInsuredPerson: {
                    objectName: 'Дополнительная декларация Застрахованного при выборе опции "Любительский спорт"',
                    triggerName: 'Согласие страхователя = Нет'
                }
            };

            const nameSpace = Object.keys(triggersConditions);

            nameSpace.forEach(currentElement => {
                const arrayInput = triggersConditions[currentElement];
                if (arrayInput == 0) { return; }
                if (!Array.isArray(arrayInput)) { return; }

                const splitObject = arrayInput.reduce((acc, cur) => {
                    acc[cur.departament] = acc[cur.departament] || [];
                    acc[cur.departament].push(cur.itemNumber);
                    return acc;
                }, {});

                const arrResult = Object.keys(splitObject);

                arrResult.forEach(departament => {
                    const confirmationDepartment = splitObject[departament].reduceRight((acc, cur, index, array) => {
                        if (index == array.length - 1) { return `${cur} - ${departament == "block" ? "Блокирование заявки" : translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament)}`; }
                        return `${cur}${index == array.length - 2 ? ' и ' : ', '}` + acc;
                    }, '');

                    body.uwTriggers.push({
                        ...triggersResultText[currentElement],
                        departament,
                        confirmationDepartment
                    });
                });
            });

            // check policy conditions
            if (triggersConditions.productCode !== undefined &&
                triggersConditions.paymentFrequencyCode !== undefined &&
                triggersConditions.risksPremiumSum !== undefined) {

                // operations
                const objectName = "Договор";
                let triggerName = "Единовременная оплата";
                let departament = "operations";
                let confirmationDepartment = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);
                const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(triggersConditions.productCode);
                const ePolicy = body?.issueForm?.code?.issueFormCode == issueForm.ePolicy.issueFormCode;
                const EBMGZENIT = [product.EBMGZENIT].includes(triggersConditions.productCode);
                const skipTriggers = [product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT].includes(triggersConditions.productCode);
                const ePolicyZenit = (isIDGZENIT || EBMGZENIT) && ePolicy;
                const EBMGNVTB = [product.EBMGNVTB].includes(triggersConditions.productCode);
                const ePolicyEBMG = ePolicy && EBMGZENIT;

                if (['EHVP', 'ERCP', 'ERC', 'ERCP2', 'ERC2'].includes(triggersConditions.productCode) &&
                    triggersConditions.paymentFrequencyCode == paymentFrequency.oneTime.code) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                if (['EHVP2'].includes(triggersConditions.productCode) &&
                    triggersConditions.paymentFrequencyCode == paymentFrequency.oneTime.code &&
                    triggersConditions.riskPremium <= 700000) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                // underwriting
                triggerName = "Расширенная программа";
                departament = "underwriting";
                confirmationDepartment = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);

                if (['EHVP2'].includes(triggersConditions.productCode)) {
                    if ((triggersConditions.paymentFrequencyCode == paymentFrequency.oneTime.code && triggersConditions.riskPremium > 700000) ||
                        (triggersConditions.paymentFrequencyCode != paymentFrequency.oneTime.code && triggersConditions.riskPremium > 200000)) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }
                }

                if (['EFRBFKO'].includes(triggersConditions.productCode)) {
                    triggerName = "Застрахованному 64-65 лет на дату заключения";
                    if (getInsuredPersonAge(triggersConditions).ageOnIssueDate >= 64 && getInsuredPersonAge(triggersConditions).ageOnIssueDate <= 65) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }
                    triggerName = "Застрахованному 71-75 лет на дату окончания";
                    if (getInsuredPersonAge(triggersConditions).ageOnEndDate >= 71 && getInsuredPersonAge(triggersConditions).ageOnEndDate <= 75) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }
                }

                const paymentFrequencyCode = triggersConditions.paymentFrequencyCode;
                const insuredAgeOnIssueDate = getInsuredPersonAge(triggersConditions).ageOnIssueDate;
                const insuredAgeOnStartDateMandatoryAgreement = triggersConditions.insuredAgeOnStartDateMandatoryAgreement;
                if ((insuredAgeOnStartDateMandatoryAgreement && paymentFrequencyCode && !skipTriggers)) {
                    const insuredAgeOnStartDateMax = triggersConditions.insuredAgeOnStartDateMax;
                    if (insuredAgeOnStartDateMax && !ePolicyZenit) {
                        triggerName = `Возраст Застрахованного на начало от ${insuredAgeOnStartDateMax} до ${insuredAgeOnStartDateMandatoryAgreement}`;
                        if (insuredAgeOnIssueDate > insuredAgeOnStartDateMax && insuredAgeOnIssueDate < insuredAgeOnStartDateMandatoryAgreement) {
                            pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                        }
                    }
                }

                const insuredAgeOnEndDate = getInsuredPersonAge(triggersConditions).ageOnEndDate;
                const insuredAgeOnEndDateMaxMandatoryAgreement = triggersConditions.insuredAgeOnEndDateMaxMandatoryAgreement;
                if ((insuredAgeOnEndDateMaxMandatoryAgreement && paymentFrequencyCode)) {
                    const insuredAgeOnEndDateMax = triggersConditions.insuredAgeOnEndDateMax;
                    if (insuredAgeOnEndDateMax && !ePolicyZenit) {
                        triggerName = `Возраст Застрахованного на окончание от ${insuredAgeOnEndDateMax} до ${insuredAgeOnEndDateMaxMandatoryAgreement}`;
                        if (insuredAgeOnEndDate > insuredAgeOnEndDateMax && insuredAgeOnEndDate < insuredAgeOnEndDateMaxMandatoryAgreement) {
                            pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                        }
                    }
                }

                const holderAgeOnIssueDate = getHolderAge(triggersConditions).ageOnIssueDate;
                const holderAgeOnStartDateMaxMandatoryAgreement = triggersConditions.holderAgeOnStartDateMaxMandatoryAgreement;
                if ((holderAgeOnStartDateMaxMandatoryAgreement && !skipTriggers)) {
                    const holderAgeOnStartDateMax = triggersConditions.holderAgeOnStartDateMax;
                    if (holderAgeOnStartDateMax && !ePolicyZenit) {
                        triggerName = `Возраст Страхователя на начало от ${holderAgeOnStartDateMax} до ${holderAgeOnStartDateMaxMandatoryAgreement}`;
                        if (holderAgeOnIssueDate > holderAgeOnStartDateMax && holderAgeOnIssueDate < holderAgeOnStartDateMaxMandatoryAgreement) {
                            pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                        }
                    }
                }

                if (holderAgeOnIssueDate >= 70 && !triggersConditions.isRiskProductGroup &&
                    (triggersConditions.isVIPVTBSegment || triggersConditions.isPremiumVTBSegment || EBMGNVTB || triggersConditions.isVIPVTBNTSegment) &&
                    !productGroupArray.TRIGGER_SKIP_IDGP.includes(triggersConditions.productCode)) {

                    const objectName = "Котировка";
                    const triggerName = `Котировка должна быть направлена на согласование в СК "Страхователь 70 или более лет"`;
                    const departament = "underwriting";
                    const confirmationDepartment = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);

                    pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                }

                const maxPremiumConfig = triggersConditions.maxPremium;
                const maxPremiumMandatoryAgreementConfig = triggersConditions.maxPremiumMandatoryAgreement;
                if (maxPremiumMandatoryAgreementConfig) {
                    const risksPremiumSum = triggersConditions.risksPremiumSum;
                    const maxPremium = getMaxPremiumOnAge(maxPremiumConfig, insuredAgeOnIssueDate);
                    const maxPremiumMandatoryAgreement = getMaxPremiumOnAge(maxPremiumMandatoryAgreementConfig, insuredAgeOnIssueDate);

                    triggerName = `Общая премия ${risksPremiumSum} в диапазоне от ${maxPremium} до ${maxPremiumMandatoryAgreement}`;
                    if (risksPremiumSum > maxPremium && risksPremiumSum <= maxPremiumMandatoryAgreement && !ePolicyZenit) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                const maxInsuredSumMainRisk = triggersConditions.maxInsuredSumMainRisk;
                const maxInsuredSumMainRiskMandatoryAgreement = triggersConditions.maxInsuredSumMainRiskMandatoryAgreement;
                if (maxInsuredSumMainRisk && maxInsuredSumMainRiskMandatoryAgreement) {
                    const mainRiskInsuredSum = triggersConditions.mainRiskInsuredSum;

                    triggerName = `Страховая сумма по основному риску ${mainRiskInsuredSum} в диапазоне от ${maxInsuredSumMainRisk} до ${maxInsuredSumMainRiskMandatoryAgreement}`;
                    if (mainRiskInsuredSum > maxInsuredSumMainRisk && mainRiskInsuredSum <= maxInsuredSumMainRiskMandatoryAgreement && !ePolicyEBMG) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                triggerName = `Выборочная проверка для целей внутреннего учета.`;
                const policyHolderAddresses = triggersConditions.policyHolderPartyBody.partyAddresses;
                const insuredAddresses = triggersConditions.insuredPersonPartyBody.partyAddresses;
                if (
                    ['CAPCLRELOAS', 'CAPCLCHILDOAS'].includes(triggersConditions.productCode)
                    && triggersConditions.maxInsuredSum >= 1000000
                    &&
                    (
                        policyHolderAddresses?.some(a => a.region == 'Ингушетия')
                        || insuredAddresses?.some(a => a.region == 'Ингушетия')
                    )
                ) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 3 000 000.`;
                if (['CAPCLRELOAS', 'CAPCLRELBOXOAS'].includes(triggersConditions.productCode)) {
                    const maxInsuredSumDLP36404 = 3000000;
                    if (triggersConditions.riskDLP36404InsuredSum > maxInsuredSumDLP36404) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП CC» 10 500 000.`;
                if (([product.EFRBFKO, product.ECOFVVTB, product.ECOFPVTB, product.ECOF2ZENIT].includes(triggersConditions.productCode))) {
                    const maxInsuredSumDLPSS36404 = 10500000;
                    if (triggersConditions.riskDLPSS36404InsuredSum > maxInsuredSumDLPSS36404 && !ePolicyZenit) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 12 000 000.`;
                if (['IBA3BFKO'].includes(triggersConditions.productCode)) {
                    const maxInsuredSumDLP36904 = 12000000;
                    if (triggersConditions.riskDLP36904InsuredSum > maxInsuredSumDLP36904) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 60 000 000.`;
                if (isNoteProduct(triggersConditions.productCode)) {
                    const maxInsuredSumDLP36904 = 60000000;
                    if (triggersConditions.riskDLP36904InsuredSum > maxInsuredSumDLP36904) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                if (productGroupArray.BASIS_ACTIVE_VTB.includes(triggersConditions.productCode) && !productGroupArray.BASIS_ACTIVE_20.includes(triggersConditions.productCode)) {
                    const insuredAgeOnIssueDate = getInsuredPersonAge(triggersConditions).ageOnIssueDate;
                    let maxInsuredSumDLP36904 = 0;

                    if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 100 000 000.`;
                        maxInsuredSumDLP36904 = 100000000;
                    }
                    if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 75) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 50 000 000.`;
                        maxInsuredSumDLP36904 = 50000000;
                    }
                    if (insuredAgeOnIssueDate >= 76 && insuredAgeOnIssueDate <= 100) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 30 000 000.`;
                        maxInsuredSumDLP36904 = 30000000;
                    }

                    if (triggersConditions.riskDLP36904InsuredSum > maxInsuredSumDLP36904) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                if (['NOTEV1BFKO'].includes(triggersConditions.productCode)) {
                    const insuredAgeOnIssueDate = getInsuredPersonAge(triggersConditions).ageOnIssueDate;
                    let maxInsuredSumDNS36404 = 0;

                    if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть НС» 20 000 000.`;
                        maxInsuredSumDNS36404 = 20000000;
                    }
                    if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 70) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть НС» 15 000 000.`;
                        maxInsuredSumDNS36404 = 15000000;
                    }
                    if (insuredAgeOnIssueDate >= 71 && insuredAgeOnIssueDate <= 80) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть НС» 5 000 000.`;
                        maxInsuredSumDNS36404 = 5000000;
                    }

                    if (triggersConditions.riskDNS36404InsuredSum > maxInsuredSumDNS36404) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                if (triggersConditions.productCode == product.TERMVVTB) {

                    const insuredAgeOnIssueDate = getInsuredPersonAge(triggersConditions).ageOnIssueDate;
                    let maxInsuredSumDLP42204 = 0;

                    if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 10 500 000.`;
                        maxInsuredSumDLP42204 = 10500000;
                    }
                    if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 70) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 5 000 000.`;
                        maxInsuredSumDLP42204 = 5000000;
                    }

                    if (triggersConditions.riskDLP42204InsuredSum > maxInsuredSumDLP42204) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть НС» 10 500 000.`;
                if (triggersConditions.productCode == product.TERMVVTB) {
                    const maxInsuredSumDNS42204 = 10500000;
                    if (triggersConditions.riskDNS42204InsuredSum > maxInsuredSumDNS42204) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ТП» 10 500 000.`;
                if (triggersConditions.productCode == product.TERMVVTB) {
                    const maxInsuredSumDTP42204 = 10500000;
                    if (triggersConditions.riskDTP42204InsuredSum > maxInsuredSumDTP42204) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

                if ([product.ECATFPVTB, product.ECATFVVTB, product.ECATFZENIT, product.ECATFUBRR].includes(triggersConditions.productCode)) {

                    const cashBackCoeff = getCashBackCoeff(triggersConditions.productCode, triggersConditions.issueDate, body, triggersConditions.insuranceTerms, false, undefined);

                    const maxInsuredSumDLPDPE36404 = 5000000 * cashBackCoeff;
                    if (triggersConditions.riskDLPDPE36404InsuredSum > maxInsuredSumDLPDPE36404) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП ОтлВ» 5 000 000.`;
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }

                    const maxInsuredSumD36404 = 5000000;
                    if (triggersConditions.riskD36404InsuredSum > maxInsuredSumD36404) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Инвалидность 1,2 ЛП ОУСВ» 5 000 000.`;
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }

                    const maxInsuredSumDA36404 = 5000000;
                    if (triggersConditions.riskDA36404InsuredSum > maxInsuredSumDA36404) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Инвалидность 1,2 НС ОУСВ» 5 000 000.`;
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }

                }

                if (['PREEQUITYVTB', 'PREEQUITYPVTB', 'PREEQUITYOAS'].includes(triggersConditions.productCode)) {

                    const insuredAgeOnIssueDate = getInsuredPersonAge(triggersConditions).ageOnIssueDate;

                    const maxInsuredSumDLP36914 = 100000000;
                    triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть ЛП» 100 000 000.`;
                    if (triggersConditions.riskDLP36914InsuredSum > maxInsuredSumDLP36914) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }

                    let maxInsuredSumDNS36414 = 0;
                    if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть НС» 20 000 000.`;
                        maxInsuredSumDNS36414 = 20000000;
                    }
                    if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 70) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть НС» 15 000 000.`;
                        maxInsuredSumDNS36414 = 15000000;
                    }
                    if (insuredAgeOnIssueDate >= 71 && insuredAgeOnIssueDate <= 80) {
                        triggerName = `Максимально допустимый размер страховой суммы по риску «Смерть НС» 10 000 000.`;
                        maxInsuredSumDNS36414 = 10000000;
                    }

                    if (triggersConditions.riskDNS36414InsuredSum > maxInsuredSumDNS36414) {
                        pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
                    }
                }

            }

            // check policy holder
            if (triggersConditions.policyHolderPartyCode !== undefined) {
                const objectName = "Страхователь";
                checkParty(body, triggersConditions.policyHolderPartyBody, objectName);
            }

            // check insured person
            if (triggersConditions.insuredPersonPartyCode !== undefined && !triggersConditions.isPolicyHolder) {
                const objectName = "Застрахованный";
                checkParty(body, triggersConditions.insuredPersonPartyBody, objectName);
            }

            // check mandatory approve
            if (productGroupArray.NOTE_MANDT_APPR.includes(triggersConditions.productCode)) {
                const objectName = "Договор";
                const triggerName = "Нота";
                const departament = "operations";
                const confirmationDepartment = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);

                pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
            }

            // check rate of return approve
            const rateOfReturn = body.basicInvestmentParameters?.rateOfReturn;
            const isREINVEST = productGroupArray.REINVEST_PRODUCT_FOR_SKIP_DRPK.includes(triggersConditions.productCode);
            const isDRPKCaseOfIncrease = checkDRPKCommissionIncrease(triggersConditions.productCode, body?.commission?.policyCommissionItems);

            const rateOfReturnEquityActives = body.additionalInvestmentParameters?.rateOfReturnEquityActives;
            const isCoordinationUDRequired = rateOfReturnEquityActives?.isCoordinationUDRequired;

            if ((!isREINVEST && rateOfReturn && !isDRPKCaseOfIncrease) || isCoordinationUDRequired) {
                const objectName = "Договор";
                const triggerName = "Договор должен быть направлен на согласование СК";
                const departament = "underwriting";
                const confirmationDepartment = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);

                pushTrigger(body, objectName, triggerName, departament, confirmationDepartment);
            }

            // check cumulation limits
            setCumulationTriggers(body);
        }

        // help function to check party
        function checkParty(body, partyBody, objectName) {

            // triggers params
            const isPublicOfficial = partyBody?.partyPersonData?.isPublicOfficial ?? false;
            const isNonResident = partyBody?.partyGeneralData?.isNonResident ?? false;
            const taxResidenceCountryCode = partyBody?.partyGeneralData?.taxResidence?.countryCode;
            const citizenship = partyBody?.partyPersonData?.citizenship ?? [];
            const isStatelessPerson = partyBody?.partyPersonData?.isStatelessPerson;
            const existsNonRussiaCitizenship = citizenship?.some(item => item.countryCode != partyConstants.countryRussia.countryCode);
            const partyPhones = partyBody?.partyPhones ?? [];
            const existsUSAPhone = partyPhones?.some(item => item.countryCode && item.countryCode.countryCode == partyConstants.countryUSA.countryCode);
            const existsRussiaPhone = partyPhones?.some(item => item.countryCode && item.countryCode.countryCode == partyConstants.countryRussia.countryCode);
            const existsNonRussiaPhone = partyPhones?.some(item => item.countryCode && item.countryCode.countryCode != partyConstants.countryRussia.countryCode);
            const partyAddresses = partyBody?.partyAddresses ?? [];
            const existsForeignAddress = partyAddresses
                .filter(item => item.addressType && RPFaddressType.includes(item.addressType.addressTypeCode))
                ?.some(item => item.isForeignAddress);
            const partyBankAccounts = partyBody?.partyBankAccounts ?? [];
            const existsForeignBank = partyBankAccounts?.some(item => item.foreignBank);
            const countryPlaceUSA = partyBody?.partyPersonData?.countryPlace?.countryCode == partyConstants.countryUSA.countryCode;
            const partyDocuments = partyBody?.partyDocuments ?? [];
            const existsForeignCitPassport = partyDocuments?.some(item => item.docType && item.docType.docTypeCode == 'foreignCitPassport');
            const existsForeignTravelPassport = partyDocuments?.some(item => item.docType && item.docType.docTypeCode == 'foreignTravelPassport');
            const existsManualAddress = partyAddresses
                ?.filter(item => item.addressType && RPFaddressType.includes(item.addressType.addressTypeCode))
                ?.some(item => item.isManualAddress);
            const productCode = body.triggersConditions.productCode;
            const isAPIEFR = body?.technicalInformation?.apiSender == 'API_EFR';
            const isSoleProprietor = partyBody?.partyPersonData?.naturalPersonCategory === 'soleProprietor';

            // trigger name will be set before each trigger check, departament before each triggers group
            let triggerName;
            let departament;
            let confirmationDepartment;

            // podft triggers
            departament = productCode == "CACB" ? "block" : "underwriting";
            confirmationDepartment = departament == "block" ? "Блокирование заявки" : translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);
            triggerName = "ПДЛ";
            if (isPublicOfficial) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

            // compliance triggers
            const isDMS = productGroupArray.DMS.includes(productCode);
            const isEBMGRETVTB = productGroupArray.POLICY_HOLDER_VALIDATION.includes(productCode);
            if (!isDMS && !isEBMGRETVTB) {

                departament = productCode == "CACB" ? "block" : "compliance";
                confirmationDepartment = departament == "block" ? "Блокирование заявки" : translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);
                triggerName = "Нерезидент РФ";
                if (isNonResident) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Налоговый нерезидент РФ";
                if (taxResidenceCountryCode != partyConstants.countryRussia.countryCode) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Гражданство, отличное от РФ";
                if (existsNonRussiaCitizenship) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Лицо без гражданства";
                if (isStatelessPerson) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Номера контактного телефона на территории США";
                if (existsUSAPhone) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Номера телефона в иностранном государстве при отсутствии номера телефона в РФ";
                if (!existsRussiaPhone && existsNonRussiaPhone) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Иностранный адрес регистрации, места фактического проживания или почтового адреса";
                if (existsForeignAddress) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Иностранный банковский счет";
                if (existsForeignBank) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Страна рождения США";
                if (countryPlaceUSA) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Паспорт иностранного гражданина";
                if (existsForeignCitPassport) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Загранпаспорт";
                if (existsForeignTravelPassport) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

                triggerName = "Страхователь - индивидуальный предприниматель";
                if (isSoleProprietor) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }
            }

            if (!isDMS && productCode != "CACB" && !isAPIEFR && !isEBMGRETVTB) {

                departament = "underwriting";
                confirmationDepartment = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', departament);
                triggerName = "Ручной адрес регистрации, места фактического проживания или почтового адреса";
                if (existsManualAddress) { pushTrigger(body, objectName, triggerName, departament, confirmationDepartment); }

            }
        }

        // help function to push trigger
        function pushTrigger(body, objectName, triggerName, departament, confirmationDepartment) {
            body.uwTriggers.push({
                objectName,
                triggerName,
                departament,
                confirmationDepartment
            });
        }

        // help function to get insured person age
        function getInsuredPersonAge(triggersConditions) {
            const issueDate = triggersConditions?.issueDate;
            const endDate = triggersConditions?.endDate;
            const dateOfBirth = triggersConditions?.insuredPersonPartyBody?.partyPersonData?.dateOfBirth;
            const ageOnIssueDate = DateTimeUtils.getYearDifference(dateOfBirth, issueDate);
            const ageOnEndDate = DateTimeUtils.getYearDifference(dateOfBirth, endDate);
            return {
                ageOnIssueDate,
                ageOnEndDate
            };
        }

        // help function to get holder age
        function getHolderAge(triggersConditions) {
            const issueDate = triggersConditions?.issueDate;
            const endDate = triggersConditions?.endDate;
            const dateOfBirth = triggersConditions?.policyHolderPartyBody?.partyPersonData?.dateOfBirth;
            const ageOnIssueDate = DateTimeUtils.getYearDifference(dateOfBirth, issueDate);
            const ageOnEndDate = DateTimeUtils.getYearDifference(dateOfBirth, endDate);
            return {
                ageOnIssueDate,
                ageOnEndDate
            };
        }

        function getMaxPremiumOnAge(premiums, age) {
            const maxPremiumConfigAge = premiums && Object.keys(premiums).find((item, idx, arr) => age >= item && (age < arr[idx + 1] || !arr[idx + 1]));
            const maxPremium = maxPremiumConfigAge && premiums[maxPremiumConfigAge];

            return maxPremium;
        }
    }

};
