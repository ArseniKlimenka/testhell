'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { productCode, guaranteedIncome, giftServices, packageCode, productGroupArray, product, sportProducts, coverageDuration } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { dateToStringDocumentationFormat } = require("@config-rgsl/infrastructure/lib/FormatUtils");
const { memoryCommissionConfiguration } = require('@config-rgsl/life-insurance/lib/memoryCommissionConfiguration');
const { insuranceRulesConfiguration } = require('@config-rgsl/life-insurance/lib/insuranceRulesConfiguration');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { getKidInsuranceTerritorySection } = require("@config-rgsl/life-insurance/lib/kidInsuranceTerritorySection");
const { getKidWhatIsNotInsuredSection } = require("@config-rgsl/life-insurance/lib/kidWhatIsNotInsuredSection");
const { getKidWhatIsInsuredSection } = require("@config-rgsl/life-insurance/lib/kidWhatIsInsuredSection");
const { getKidGetInsurancePaymentSection } = require("@config-rgsl/life-insurance/lib/kidHowToGetInsurancePaymentSection");
const { getKidReasonsToReturnPremiumSection, getKidOtheCasesToReturnPremiumSection, getKidDaysToReturnPremiumSection, getKidInsurancePremiumRefundAmont } = require("@config-rgsl/life-insurance/lib/kidHowToReturnPremiumSection");
const { businessRules } = require('@adinsure/runtime');
const { getCashBackCoeff } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

const emptyValue = '';

module.exports = {

    getPrintoutCommonData: function (input, documentContext) {

        const body = input?.body;

        const policyHolder = body?.policyHolder;
        const insuredPerson = body?.insuredPerson;
        const basicConditions = body?.basicConditions;
        const mainInsuranceConditions = body?.mainInsuranceConditions;
        const basicInvestmentParameters = body?.basicInvestmentParameters;
        const risks = body?.risks;
        const policyTerms = body?.policyTerms;
        const beneficiaries = body?.beneficiaries;

        const declarationMain = body?.declarationMain;
        const declarationMainConfirmation = body?.declarationMainConfirmation;
        const declarationMedical = body?.declarationMedical;
        const declarationMedicalConfirmation = body?.declarationMedicalConfirmation;

        const productCode = mainInsuranceConditions?.insuranceProduct?.productCode;
        const issueDate = basicConditions?.issueDate;

        const strategyCode = basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;

        const basicAssetProperties = body?.basicAssetProperties;

        return {
            body,
            policyHolder,
            insuredPerson,
            basicConditions,
            mainInsuranceConditions,
            basicInvestmentParameters,
            risks,
            policyTerms,
            beneficiaries,
            declarationMain,
            declarationMainConfirmation,
            declarationMedical,
            declarationMedicalConfirmation,
            productCode,
            issueDate,
            strategyCode,
            basicAssetProperties
        };
    },

    qrCodeGenerator: function (personalAcc, bankName, bic, correspAcc, { lastName, firstName, middleName }, { number, issueDate }, premiumSum) {
        const insurerName = this.getQRValue('Name', printoutsConstant.insurerInfo.name, 160);
        const perAcc = this.getQRValue('PersonalAcc', personalAcc, 20);
        const bank = this.getQRValue('BankName', bankName, 45);
        const bankBic = this.getQRValue('BIC', bic, 9);
        const corAcc = this.getQRValue('CorrespAcc', correspAcc, 20);
        const inn = this.getQRValue('PayeeINN', printoutsConstant.insurerInfo.INN, 12);
        const kpp = this.getQRValue('KPP', printoutsConstant.insurerInfo.KPP, 9);
        const lName = this.getQRValue('LastName', lastName, 210);
        const fName = this.getQRValue('FirstName', firstName, 210);
        const mName = middleName ? this.getQRValue('MiddleName', middleName, 210) : emptyValue;
        const purpose = this.getQRValue('Purpose', number, 210);
        const date = this.getQRValue('DocDate', issueDate, 210);
        const sum = this.getQRValue('Sum', this.getClearSum(premiumSum), 210);

        const result = printoutsConstant.qr.techInfo + insurerName + perAcc + bank + bankBic + corAcc + inn + kpp + lName + fName + mName + purpose + date + sum + printoutsConstant.qr.techCode;

        return result;
    },

    getClearSum: function (premiumSum) {
        const clearSum = premiumSum.replace(/\s/g, "").replace(",", ".");
        const floatSum = parseFloat(clearSum) * 100;
        const resultSum = floatSum.toFixed(0);

        return resultSum;
    },

    getQRValue: function (name, nameValue, maxNameValueLength) {
        const qrValue = nameValue ? name + '=' + nameValue.slice(0, maxNameValueLength) + '|' : emptyValue;
        return qrValue;
    },

    getQRRuleLink: function (body) {
        const ruleCode = body.insuranceRules?.ruleCode;
        if (!ruleCode) {
            return;
        }

        const ruleConf = insuranceRulesConfiguration({ ruleCode });
        const ruleLink = ruleConf?.ruleLink;
        return ruleLink;
    },

    getBankInfoByBody: function (body) {

        const partnerBusinessCode = body.mainInsuranceConditions?.partner?.partnerBusinessCode;
        const insuranceProductCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        const issueDate = body.basicConditions?.issueDate;

        const partnerInfo = this.getBankInfo(partnerBusinessCode, insuranceProductCode, issueDate);

        return partnerInfo;
    },

    getBankInfo: function (partnerBusinessCode, insuranceProductCode, issueDate) {
        const partnerData = printoutsConstant['partner' + partnerBusinessCode];
        let link = partnerData.find(x => x.startDateInAction && DateTimeUtils.isAfterOrEqual(issueDate, x.startDateInAction));

        if (!link) {
            link = partnerData.find(x => !x.startDateInAction || DateTimeUtils.isBefore(x.startDateInAction, issueDate));
        }

        return {
            personalAcc: link[insuranceProductCode]?.personalAcc ?? link["PRODUCT_CODE_ANY"]?.personalAcc,
            bankName: link.bankName,
            city: link.city,
            correspAcc: link.correspAcc,
            bic: link.bic,
            partnerName: link.partnerName,
            partnerAddress: link.partnerAddress,
            finKnowPartnerName: link.finKnowPartnerName,
            finKnowpartnerAddress: link.finKnowpartnerAddress
        };
    },

    getPollicyInfo: function (input, that) {
        const number = that.businessContext.documentNumber;
        const issueDate = this.formatDatePrint(input.body.basicConditions.issueDate);
        const productDescription = input.body.mainInsuranceConditions.insuranceProduct.productDescription.split(' (')[0];
        const ruleDescription = input.body.insuranceRules?.ruleDescription;
        const riskInsuredSum = input.body?.basicConditions?.riskInsuredSum;
        const rule = ruleDescription ? ruleDescription.replace('Правила', 'Правил') : emptyValue;
        const isPremial = printoutsConstant.premialProduct.some(element => element == input.body.mainInsuranceConditions.insuranceProduct.productCode);
        let currency = emptyValue;
        const currencyCode = input.body.basicConditions.currency.currencyNumericCode;
        const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
        const paymentFrequency = getValue(input, 'body.basicConditions.paymentFrequency.paymentFrequencyCode');

        let experationDate = this.formatDatePrint(input.body.paymentPlan[0]?.paymentExpirationDate);

        if (([product.EBMGVTB, product.EBMGNVTB].includes(productCode) && lifeInsuranceConstants.paymentFrequency.oneTime.code == paymentFrequency) || (sportProducts.includes(productCode))) {

            experationDate = this.formatDatePrint(input.body.policyTerms.paymentPeriodStartDate);
        }

        const issueDateDocumentationFormat = formatHelper.dateToStringDocumentationFormat(input.body.basicConditions.issueDate);

        switch (currencyCode) {
            case '643':
                currency = 'рублей';
                break;
            case '978':
                currency = 'евро';
                break;
            case '840':
                currency = 'долларов США';
                break;
        }

        return {
            policy: {
                number,
                issueDate,
                product: productDescription,
                rule,
                issueDateDocumentationFormat
            },
            isPremial,
            currency,
            experationDate,
            riskInsuredSum
        };
    },

    getPerson: function (person) {
        const fullName = person.partyFullName;
        const gender = person.partyBody.partyPersonData?.personGender == 'Male' ? 'Мужской' : 'Женский';
        const dateOfBirth = this.formatDatePrint(person.partyBody.partyPersonData?.dateOfBirth);
        const birthPlace = person.partyBody.partyPersonData?.birthPlace;
        const phoneNumber = this.getPhoneNumber(person.partyBody.partyPhones);
        const email = this.getEmail(person.partyBody.partyEmails);
        const citizenship = person.partyBody.partyPersonData?.isStatelessPerson ? 'Лицо без гражданства' : this.getCitizenship(person.partyBody.partyPersonData?.citizenship);
        const document = this.getDocument(person.partyBody.partyDocuments);
        const registrationAddress = this.getAddress(person.partyBody.partyAddresses, 'R') || 'Отсутствует';
        const postAddress = this.getAddress(person.partyBody.partyAddresses, 'P') || this.getAddress(person.partyBody.partyAddresses, 'R') || 'Отсутствует';
        const isNotIssuedBy = document.issuedBy == emptyValue;

        const lastName = person.partyBody.partyPersonData?.lastName;
        const firstName = person.partyBody.partyPersonData?.firstName;
        const middleName = person.partyBody.partyPersonData?.middleName;
        let signatureName = emptyValue;
        if (lastName && firstName) { signatureName = lastName + ' ' + firstName.substring(0, 1) + '.' + (middleName ? (' ' + middleName.substring(0, 1) + '.') : emptyValue); }

        return {
            fullName,
            gender,
            dateOfBirth,
            birthPlace,
            phoneNumber,
            email,
            citizenship,
            document,
            registrationAddress,
            postAddress,
            isNotIssuedBy,
            signatureName,
        };
    },

    getLegalEntity: function (legalEntity) {
        const fullName = legalEntity.partyFullName;
        const phoneNumber = this.getPhoneNumber(legalEntity.partyBody.partyPhones);
        const email = this.getEmail(legalEntity.partyBody.partyEmails);
        const document = this.getDocument(legalEntity.partyBody.partyDocuments);
        const registrationAddress = this.getAddress(legalEntity.partyBody.partyAddresses, 'R') || 'Отсутствует';
        const postAddress = this.getAddress(legalEntity.partyBody.partyAddresses, 'P') || this.getAddress(legalEntity.partyBody.partyAddresses, 'R') || 'Отсутствует';
        const INN = legalEntity.partyBody.partyGeneralData.INNKIO;
        const OGRN = legalEntity.partyBody.partyOrganisationData.partyOGRN.OGRNOGRNIP;
        const dateOfStateRegistration = this.formatDatePrint(legalEntity.partyBody.partyOrganisationData.partyOGRN.dateOfStateRegistration);
        const registrationAgencyCode = legalEntity.partyBody.partyOrganisationData.partyOGRN.registrationAgencyCode;

        return {
            fullName,
            phoneNumber,
            email,
            document,
            registrationAddress,
            postAddress,
            INN,
            OGRN,
            dateOfStateRegistration,
            registrationAgencyCode,
        };
    },

    getPhoneNumber: function (array) {
        let result;
        if (array == undefined || array.length == 0) {
            result = 'Отсутствует';
        } else {
            const index = array.findIndex(element => element.isPreferable);
            if (index != -1) { result = array[index].fullNumberFormatted; }
            else {
                result = array[array.length - 1].fullNumberFormatted;
            }
        }
        return result;
    },

    getEmail: function (array) {
        let result;
        if (array == undefined || array.length == 0) { result = 'Отсутствует'; }
        else {
            const index = array.findIndex(element => element.isPreferable);
            if (index != -1) { result = array[index].email; }
            else {
                result = array[array.length - 1].email;
            }
        }
        return result;
    },

    getCitizenship: function (array) {
        let result = emptyValue;
        if (array == undefined || array.length == 0) { result = emptyValue; }
        else {
            array.forEach(element => {
                return result += element.countryShortName + ' ';
            });
        }
        return result;
    },

    getDocument: function (array) {
        let result;
        if (array == undefined || array.length == 0) {
            result = {
                typeAndSN: emptyValue,
                dateOfIssue: emptyValue,
                issuedBy: emptyValue
            };
        }
        else {
            const index = array.findIndex(element => element.docType.docTypeCode == 'passport');
            if (index != -1) {
                const pasport = array[index];
                result = {
                    typeAndSN: `Паспорт гражданина РФ серия ${pasport.docSeries} № ${pasport.docNumber}`,
                    dateOfIssue: this.formatDatePrint(pasport.issueDate),
                    issuedBy: `${pasport.issuerName}, код подразделения: ${pasport.issuerCode}`
                };
            }
            else {
                const otherDocument = array[array.length - 1];
                result = {
                    typeAndSN: `${otherDocument.docType ? otherDocument.docType.docTypeDesc : otherDocument.otherDocTypeDesc} серия ${otherDocument.docSeries ? otherDocument.docSeries : 'Отсутствует'} № ${otherDocument.docNumber ? otherDocument.docNumber : 'Отсутствует'}`,
                    dateOfIssue: this.formatDatePrint(otherDocument.issueDate),
                    issuedBy: otherDocument.issuerName ? `${otherDocument.issuerName}, код подразделения: ${otherDocument.issuerCode ? otherDocument.issuerCode : 'Отсутствует'}` : emptyValue
                };
            }
        }
        return result;
    },

    getAddress: function (array, type) {
        let result;
        if (array == undefined || array.length == 0) { return; }

        const index = array.findIndex(element => element.addressType.addressTypeCode == type);
        if (index != -1) {
            const address = array[index];
            const addressCountry = address.country ? (address.country + ', ') : emptyValue;
            const fullAddress = address.fullAddress && address.fullAddress.value || emptyValue;
            result = `${addressCountry}${fullAddress}`;
        }

        return result;
    },

    getFrequency: function (code) {
        const frequency = {};
        let notLump = true;

        switch (code) {
            case '1':
                frequency.risk = 'единовременного';
                frequency.premium = 'единовременно';
                notLump = false;
                break;
            case '2':
                frequency.risk = 'ежегодного';
                frequency.premium = 'раз в год';
                frequency.threePayments = 'годового';
                break;
            case '3':
                frequency.risk = 'полугодового';
                frequency.premium = 'раз в полгода';
                frequency.threePayments = 'полугодового';
                break;
            case '4':
                frequency.risk = 'ежеквартального';
                frequency.premium = 'раз в квартал';
                frequency.threePayments = 'ежеквартально';
                break;
            case '5':
                frequency.risk = 'ежемесячного';
                frequency.premium = 'раз в месяц';
                frequency.threePayments = 'ежемесячно';
                break;
        }

        return {
            frequency,
            notLump
        };
    },

    getRisk: function (body, risks, product, numberOfProgramm, notLump, insuredAge, paymentFrequencyCode, isCbrMemo) {
        const mandatory = [];
        const additional = [];
        const premium = {
            sum: '0',
            mandatory: '0',
            sumByDate: '0'
        };
        let sum1 = 0;
        let sum2 = 0;
        let sum3 = 0;
        const mainIP = [];
        const mainPH = [];
        const additionalIP = [];
        const additionalPH = [];
        const contractStartDate = body?.policyTerms?.startDate;

        risks.forEach(element => {
            const result = {
                riskCode: element.risk.riskCode,
                insuranceRisks: element.risk.riskFullDescription,
                sumInsured: this.formatMoneyPrint(element.riskInsuredSum),
                insurancePremium: this.formatMoneyPrint(element.riskPremium),
                insurancePayment: '100% страховой суммы',
                insurancePaymentAddCBRF: emptyValue,
                startDate: this.formatDatePrint(element.startDate),
                endDate: this.formatDatePrint(element.endDate),
                riskProgram: element.risk.riskProgram,
                riskPerson: element.risk.riskPerson,
                riskShortDescription: element.risk.riskShortDescription,
                riskInsuredSumByPeriod: []
            };

            if (!element.startDate || !contractStartDate || element.startDate == contractStartDate) {
                sum3 += +element.riskPremium;
            }

            sum1 += +element.riskPremium;

            const productConf = body?.productConfiguration ?? {};
            const term = DateTimeUtils.getYearDifference(element.startDate, element.endDate);
            const cashBackCoeff = getCashBackCoeff(product, element.startDate, body, term, false, undefined);

            const guaranteedIncomeCode = product == lifeInsuranceConstants.product.IDGV1BFKO ?
                guaranteedIncome.insuranceTermEnd.code : guaranteedIncome.annual.code;
            const isAnnualGuaranteedIncome = productConf.guaranteedIncome.includes(guaranteedIncomeCode);

            const cashBackPercent = cashBackCoeff > 1 && this.formatMoneyPrint(round((cashBackCoeff - 1) * 100, 2));

            switch (element.risk.riskCode) {
                case 'E36914':
                    result.insuranceRisks = 'Дожитие Застрахованного до окончания срока страхования (далее – Дожитие)';
                    if (isCbrMemo) {
                        result.insuranceRisks = 'Дожитие';
                        result.insurancePayment = '100% СС по риску и ДИД, при его наличии';
                    }
                    break;
                case 'DLP36914':
                    result.insuranceRisks = 'Смерть Застрахованного по любой причине (далее – Смерть)';
                    if (isCbrMemo) {
                        result.insuranceRisks = 'Смерть';
                        result.insurancePayment = '100% СС по риску и ДИД, при его наличии';
                    }
                    break;
                case 'DNS36414':
                    result.insuranceRisks = 'Смерть Застрахованного в результате несчастного случая (далее – Смерть НС)';
                    if (isCbrMemo) {
                        result.insuranceRisks = 'Смерть НС';
                        result.insurancePayment = '100% СС по риску';
                    }
                    break;
                case 'E36102':
                    result.insuranceRisks = 'Дожитие Застрахованного до окончания срока страхования (далее – Дожитие)';
                    result.insurancePaymentAddCBRF = ' по риску и дополнительный инвестиционный доход, при его наличии';
                    break;
                case 'DPVV36102':
                    result.insuranceRisks = 'Смерть Застрахованного по любой причине (далее – Смерть)';
                    result.sumInsured = `в размере фактически уплаченных страховых взносов по ${product == 'ERCP' ? 'основной программе' : 'договору страхования'} на дату страхового случая`;
                    result.insurancePaymentAddCBRF = ' по риску и дополнительный инвестиционный доход, при его наличии';
                    break;
                case 'D36102':
                    result.sumInsured = 'сумма подлежащих оплате страховых взносов по рискам Дожитие и Смерть на дату наступления страхового случая';
                    result.insurancePayment = 'освобождение от уплаты страховых взносов по рискам Дожитие и Смерть';
                    break;
                case 'DA36102':
                    result.sumInsured = 'сумма подлежащих оплате страховых взносов по рискам Дожитие и Смерть на дату наступления страхового случая';
                    result.insurancePayment = 'освобождение от уплаты страховых взносов по рискам Дожитие и Смерть';
                    break;
                case 'CDP36102':
                    result.insuranceRisks = 'Первичное диагностирование Застрахованному критического заболевания';
                    result.insurancePayment = `100% страховой суммы в соответствии со Списком критических заболеваний №${product == 'ERCP' ? '1' : '2'}`;
                    break;
                case 'DNS36102':
                    result.insuranceRisks = 'Смерть Застрахованного в результате несчастного случая';
                    break;
                case 'DLPSS36102':
                    result.insuranceRisks = 'Смерть Застрахованного по любой причине (далее – Смерть)';
                    result.insurancePaymentAddCBRF = ' по риску и дополнительный инвестиционный доход, при его наличии';
                    break;
                case 'HI36102':
                    result.insuranceRisks = 'Тяжкие телесные повреждения Застрахованного в результате несчастного случая';
                    result.insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (приложение №2 к Правилам)';
                    break;
                case 'JL36102':
                    result.insuranceRisks = 'Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты одного страхового взноса';
                    result.insurancePayment = 'освобождение от уплаты одного страхового взноса по договору страхования в пределах страховой суммы по данному риску';
                    break;
                case 'CDH10800':
                    result.sumInsured = `в соответствии с Программой ДМС «Диагностирование и лечение критического заболевания» №${numberOfProgramm}`;
                    result.insurancePayment = `предоставление медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания» №${numberOfProgramm}`;
                    break;
                case 'CU10800':
                    result.sumInsured = `в соответствии с Программой ДМС «Медицинские обследования» №${numberOfProgramm}`;
                    result.insurancePayment = `предоставление медицинских или иных услуг, предусмотренных Программой ДМС «Медицинские обследования» №${numberOfProgramm}`;
                    break;
                case 'E36904':
                    result.insuranceRisks = 'Дожитие Застрахованного до окончания срока страхования';
                    result.insuranceRisksAddCBRF = ' (далее – Дожитие)';
                    if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(product) || lifeInsuranceConstants.product.IBA2P3.includes(product)) {
                        result.insuranceRisks = result.insuranceRisks + ' (далее – Дожитие)';
                    }
                    else if (product == lifeInsuranceConstants.product.NOTEV1BFKO) {

                        result.insurancePayment = '100% страховой суммы по риску';
                    }
                    else if (product == lifeInsuranceConstants.product.NOTE1BFKO4 || product == lifeInsuranceConstants.product.NOTEV3BFKO) {
                        result.insurancePayment = '100% страховой суммы';
                    }
                    else {
                        result.insurancePayment = '100% страховой суммы по риску и дополнительный инвестиционный доход, при его наличии';
                    }

                    if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB.includes(product) ||
                        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(product) ||
                        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_DEFAULT.includes(product)) {

                        result.insuranceRisks += ' (далее – Дожитие)';
                        result.insurancePayment = '100% страховой суммы по риску и дополнительный инвестиционный доход, при его наличии';
                    }

                    break;
                case 'DLP36904':
                    result.insuranceRisks = 'Смерть Застрахованного по любой причине';
                    if (product == lifeInsuranceConstants.product.NOTEV1BFKO) {
                        result.insurancePayment = '100% страховой суммы по риску';
                    }
                    else if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(product)) {
                        result.sumInsured = `в соответствии с таблицей раздела V договора страхования`;
                        result.insuranceRisks = 'Смерть Застрахованного по любой причине (далее – Смерть)';
                    }
                    else if (product == lifeInsuranceConstants.product.NOTE1BFKO4 || product == lifeInsuranceConstants.product.NOTEV3BFKO) {
                        result.insurancePayment = '100% страховой суммы';
                    }
                    else {
                        result.insurancePayment = `100% страховой суммы по риску и дополнительный инвестиционный доход, при его наличии`;
                    }

                    if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB.includes(product) ||
                        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(product)) {

                        result.insuranceRisks += ' (далее – Смерть)';
                        result.riskSimpleDescription = 'Смерть';
                    }
                    if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_DEFAULT.includes(product) || lifeInsuranceConstants.product.IBA2P3.includes(product)) {
                        result.insuranceRisks += ' (далее – Смерть)';
                    }
                    break;
                case 'DNS36904':
                    result.insuranceRisks = 'Смерть Застрахованного в результате несчастного случая';
                    result.insurancePayment = `100% страховой суммы по риску`;
                    if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(product) ||
                        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB.includes(product) ||
                        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(product) ||
                        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_DEFAULT.includes(product) || lifeInsuranceConstants.product.IBA2P3.includes(product)) {

                        result.insuranceRisks = result.insuranceRisks + ' (далее – Смерть НС)';
                    }
                    break;
                case 'DLPDP36904':
                    result.insuranceRisks = 'Смерть Застрахованного по любой причине с отложенной страховой выплатой';
                    result.insurancePayment = '100% страховой суммы по риску и дополнительный инвестиционный доход, при его наличии';
                    break;
                case 'E36404':
                    result.insuranceRisks = `Дожитие Застрахованного до окончания срока страхования${(product.indexOf('IBG') > -1 || product.indexOf('EFRBFKO') > -1 || product.indexOf('EBMBFKO') > -1 || product.indexOf('IDG') > -1 || product.indexOf('CAPCL') > -1 || product.indexOf('EBMPYBFKO') > -1 || product.indexOf('EBMPFBFKO') > -1 || product.indexOf('EBMGBFKO') > -1) || product.indexOf('EBMGMINBANK') > -1 || product.indexOf('EBMOAS2') > -1 || product.indexOf('EBMG') > -1 || product.indexOf('EBMGP') > -1 || product.indexOf('EBMGZENIT') > -1 || product.indexOf('ECATFPVTB') > -1 || product.indexOf('ECATFVVTB') > -1 || product.indexOf('ECATFZENIT') > -1 || product.indexOf('ECOFPVTB') > -1 || product.indexOf('ECOFVVTB') > -1 || product.indexOf('EBMMGREINVEST') > -1 || product.indexOf('EBMGN') > -1 || product.indexOf('ECATFUBRR') > -1 || product.indexOf('EBMOPTIMAOAS2') > -1 || product.indexOf('ECOF2ZENIT') > -1 || product.indexOf('EBM3GUBRR') > -1 ? emptyValue : ' (далее – Дожитие)'}`;
                    if (product.indexOf('ECATFPVTB') > -1 || product.indexOf('ECATFVVTB') > -1 || product.indexOf('ECATFZENIT') > -1 || product.indexOf('ECATFUBRR') > -1) {
                        result.insurancePayment = '100% страховой суммы, выплата осуществляется по окончании срока действия договора страхования';
                    }
                    break;
                case 'DNS36404':
                    result.insuranceRisks = 'Смерть Застрахованного в результате несчастного случая';
                    if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB.includes(product) ||
                        lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(product)) {

                        result.insuranceRisks = result.insuranceRisks + ' (далее – Смерть НС)';
                    }
                    break;
                case 'DLPSS36404':
                    result.insuranceRisks = `Смерть Застрахованного по любой причине${product.indexOf('EFRBFKO') > -1 || product.indexOf('ECOFPVTB') > -1 || product.indexOf('ECOFVVTB') > -1 || product.indexOf('ECOF2ZENIT') > -1 ? emptyValue : ' (далее – Смерть)'}`;
                    break;
                case 'D36404':
                    if (product.indexOf('ECATFPVTB') > -1 || product.indexOf('ECATFVVTB') > -1 || product.indexOf('ECATFZENIT') > -1 || product.indexOf('ECATFUBRR') > -1) {
                        result.insurancePayment = 'освобождение от уплаты страховых взносов по договору страхования';
                        result.sumInsured = `сумма подлежащих оплате страховых взносов по договору страхования на дату наступления страхового случая`;
                    }
                    else {
                        result.insurancePayment = `освобождение от уплаты страховых взносов по ${product.indexOf('CAPCL') > -1 ? 'основной программе' : 'рискам Дожитие и Смерть'}`;
                        result.sumInsured = `сумма подлежащих оплате страховых взносов по ${product.indexOf('CAPCL') > -1 ? 'основной программе' : 'рискам Дожитие и Смерть'} на дату наступления страхового случая`;
                    }
                    break;
                case 'JL36404':
                    result.insuranceRisks = 'Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты страховых взносов на определенный период';
                    result.insurancePayment = `${product.indexOf('CAPCL') > -1 ? `освобождение от уплаты страховых взносов по договору страхования на период равный ${paymentFrequencyCode == '2' ? '1-му календарному году' : '1-му календарному полугодию'} с даты наступления страхового случая в пределах страховой суммы по данному риску` : 'освобождение от уплаты одного страхового взноса по договору страхования в пределах страховой суммы по данному риску'}`;
                    break;
                case 'MJL36404':
                    result.insuranceRisks = 'Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты страховых взносов на определенный период';
                    result.insurancePayment = `освобождение от уплаты страховых взносов по договору страхования на период равный ${paymentFrequencyCode == '2' ? '1-му календарному году' : '1-му календарному полугодию'} с даты наступления страхового случая в пределах страховой суммы по данному риску`;
                    break;
                case 'CD36404':
                    if (product.indexOf('CAPCL') > -1) {
                        result.insurancePayment = '100% страховой суммы в соответствии со Списком критических заболеваний';
                    } else {
                        result.insurancePayment = `100% страховой суммы в соответствии со Списком критических заболеваний №${product == 'ERCP2' ? '1' : '2'}`;
                    }
                    break;
                case 'HI36404':
                    result.insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (приложение №2 к Правилам)';
                    break;
                case 'DLPVV36404':
                    result.insuranceRisks = `Смерть Застрахованного по любой причине${product.indexOf('CAPCLCHILD') > -1 || product.indexOf('EBMPYBFKO') > -1 || product.indexOf('EBMGBFKO') > -1 || product.indexOf('EBMGMINBANK') > -1 || product.indexOf('EBMOAS2') > -1 || product.indexOf('EBMG') > -1 || product.indexOf('EBMGP') > -1 || product.indexOf('EBMGZENIT') > -1 || product.indexOf('ECATFPVTB') > -1 || product.indexOf('ECATFVVTB') > -1 || product.indexOf('ECATFZENIT') > -1 || product.indexOf('EBMMGREINVEST') > -1 || product.indexOf('EBMGN') > -1 || product.indexOf('ECATFUBRR') > -1 || product.indexOf('EBMOPTIMAOAS2') > -1 || product.indexOf('EBM3GUBRR') > -1 ? emptyValue : ' (далее – Смерть)'}`;
                    if (product.indexOf('ECATFPVTB') > -1 || product.indexOf('ECATFVVTB') > -1 || product.indexOf('ECATFZENIT') > -1 || product.indexOf('ECATFUBRR') > -1) {
                        result.insurancePayment = '100% страховой суммы, выплата осуществляется в течение 30 календарных дней со дня предоставления документов, указанных в п. 11 Правил';
                        result.sumInsured = 'в размере фактически уплаченных страховых взносов по основной программе на дату страхового случая';
                    }
                    else {
                        result.sumInsured = `в размере фактически уплаченных страховых взносов по ${product.indexOf('CAPCLCHILD') > -1 ? 'основной программе' : ' договору страхования'} на дату страхового случая`;
                    }
                    break;
                case 'DLPDPE36404':
                    result.insuranceRisks = `Смерть Застрахованного по любой причине с отложенной страховой выплатой`;
                    break;
                case 'DA36404':
                    if (product.indexOf('ECATFPVTB') > -1 || product.indexOf('ECATFVVTB') > -1 || product.indexOf('ECATFZENIT') > -1 || product.indexOf('ECATFUBRR') > -1) {
                        result.insurancePayment = 'освобождение от уплаты страховых взносов по договору страхования';
                        result.sumInsured = `сумма подлежащих оплате страховых взносов по договору страхования на дату наступления страхового случая`;
                    }
                    else {
                        result.insurancePayment = `освобождение от уплаты страховых взносов по ${product.indexOf('CAPCL') > -1 ? 'основной программе' : 'рискам Дожитие и Смерть'}`;
                        result.sumInsured = `сумма подлежащих оплате страховых взносов по ${product.indexOf('CAPCL') > -1 ? 'основной программе' : 'рискам Дожитие и Смерть'}  на дату наступления страхового случая`;
                    }
                    break;
                case 'CDP36404':
                    result.insurancePayment = '100% страховой суммы в соответствии со Списком критических заболеваний №2';
                    break;
                case 'DVV36404':
                    if (product.indexOf('CAPCL') > -1) {
                        result.insurancePayment = 'I группа - 100% страховой суммы, II группа - 75% страховой суммы';
                    } else {
                        result.sumInsured = 'в размере фактически уплаченных страховых взносов по основной программе на дату страхового случая';
                    }
                    break;
                case 'DAVV36404':
                    result.sumInsured = 'в размере фактически уплаченных страховых взносов по основной программе на дату страхового случая';
                    break;
                case 'DASS36404':
                    result.insuranceRisks = 'Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая';
                    result.insurancePayment = 'I группа - 100% страховой суммы, II группа - 75% страховой суммы';
                    break;
                case 'CTDA36404':
                    result.insurancePayment = 'процент от страховой суммы в соответствии с п. 10.9 Правил';
                    break;
                case 'CDHR10800':
                    result.insuranceRisks = 'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания», вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг';
                    result.sumInsured = `в соответствии с Программой ДМС «Диагностирование и лечение критического заболевания» №${(product == 'EBMPYBFKO' || product == 'ECOFPVTB' || product == 'ECOFVVTB') ? '5' : product == 'TERMVVTB' ? '8' : product == 'ECOF2ZENIT' ? '10' : '2'}`;
                    result.insurancePayment = `предоставление медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания» №${(product == 'EBMPYBFKO' || product == 'ECOFPVTB' || product == 'ECOFVVTB') ? '5' : product == 'TERMVVTB' ? '8' : product == 'ECOF2ZENIT' ? '10' : '2'}`;
                    break;
                case 'CDVV36404':
                    result.insuranceRisks = 'Первичное диагностирование Застрахованному критического заболевания с освобождением от уплаты страховых взносов';
                    result.sumInsured = 'сумма подлежащих оплате страховых взносов по основной программе на дату наступления страхового случая';
                    result.insurancePayment = 'освобождение от уплаты страховых взносов по основной пограмме в соответствии со Списком критических заболеваний №2';
                    break;
                case 'CDHW10800':
                    result.insuranceRisks = 'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания», вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг';
                    result.sumInsured = `в соответствии с Программой ДМС «Диагностирование и лечение критического заболевания» №${product == 'TERMVVTB' ? '9' : '4'}`;
                    result.insurancePayment = `предоставление медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания» №${product == 'TERMVVTB' ? '9' : '4'}`;
                    break;
                case 'DLPVV6536404':
                    result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая, увеличенном на ' + cashBackPercent + '%';
                    break;
                case 'DLPVV7036404':
                    result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                    break;
                case 'DNSVV36404':
                    if (element.isUnifiedInsuranceAmount) {
                        result.sumInsured = this.formatMoneyPrint(element.riskInsuredSum);
                    }
                    else if (element.isLimitedInsuranceAmount) {
                        result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                        result.sumInsured = result.sumInsured + ', но не более ' + this.formatMoneyPrint(element.riskInsuredSum) + ' рублей';
                    }
                    else {
                        result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                        if (product.indexOf('EBMGBFKO') > -1) {
                            if (insuredAge >= 72 && insuredAge <= 85) {
                                result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge < 72) {
                                result.sumInsured = result.sumInsured + ', но не более 10 000 000 рублей';
                            }
                        }
                        else if (['EBMGNRETVTB', 'EBMGNVTB'].includes(product)) {
                            result.sumInsured = result.sumInsured + ', но не более 3 000 000 рублей';
                        }
                        else if (['EBMGNT'].includes(product)) {
                            if (insuredAge >= 71 && insuredAge <= 85) {
                                result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge < 71) {
                                result.sumInsured = result.sumInsured + ', но не более 5 000 000 рублей';
                            }
                        }
                        else if (product.indexOf('EBMGMINBANK') > -1) {
                            if (insuredAge >= 72 && insuredAge <= 85) {
                                result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge < 72) {
                                result.sumInsured = result.sumInsured + ', но не более 10 000 000 рублей';
                            }
                        }
                        else if (product.indexOf('EBMGN') > -1) { // EBMGP
                            if (insuredAge >= 71 && insuredAge <= 85) {
                                result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge < 71) {
                                result.sumInsured = result.sumInsured + ', но не более 5 000 000 рублей';
                            }
                        }
                        else if (['EBMGRETVTB', 'EBMGPB', 'EBM3GUBRR'].includes(product)) {
                            result.sumInsured = result.sumInsured + ', но не более 15 000 000 рублей';
                        }
                        else if (product.indexOf('EBMOAS2') > -1) {
                            if (insuredAge >= 72 && insuredAge <= 85) {
                                result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge < 72) {
                                result.sumInsured = result.sumInsured + ', но не более 10 000 000 рублей';
                            }
                        }
                        else if (product.indexOf('EBMGVTB') > -1) {
                            if (insuredAge >= 72 && insuredAge <= 85) {
                                result.sumInsured = result.sumInsured + ', но не более 5 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge < 72) {
                                result.sumInsured = result.sumInsured + ', но не более 15 000 000 рублей';
                            }
                        }
                        else if (product.indexOf('EBMG') > -1) { // EBMGP
                            if (insuredAge >= 72 && insuredAge <= 85) {
                                result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge < 72) {
                                result.sumInsured = result.sumInsured + ', но не более 10 000 000 рублей';
                            }
                        }
                        else if (product.indexOf('EBMOPTIMAOAS2') > -1) { // EBMOPTIMAOAS2
                            if (insuredAge >= 71 && insuredAge <= 80) {
                                result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                            }
                            else if (insuredAge >= 18 && insuredAge <= 70) {
                                result.sumInsured = result.sumInsured + ', но не более 10 000 000 рублей';
                            }
                        }
                    }
                    break;
                case 'DLPT36404':
                    if (!isAnnualGuaranteedIncome && product.indexOf('IDGP1VTB') == -1 && product.indexOf('IDGV1VTB') == -1 && product.indexOf('IDGPN1VTB') == -1) {
                        result.sumInsured = 'в соответствии с таблицей раздела V договора страхования';
                    }
                    break;
                case 'HA42204':
                    result.insurancePayment = '0,2% от страховой суммы за каждый день стационарного лечения, начиная с 7-го дня, но не более 30 дней';
                    break;
                case 'TDA42204':
                    result.insurancePayment = '0,2% от страховой суммы за каждый день нетрудоспособности, начиная с 21-го дня, но не более 90 дней';
                    break;
                case 'TDLP42204':
                    result.insurancePayment = '0,1% от страховой суммы за каждый день нетрудоспособности, начиная с 21-го дня, но не более 90 дней';
                    break;
                case 'CDP42204':
                    result.insurancePayment = '100% страховой суммы в соответствии со Списком критических заболеваний №2';
                    break;
                case 'I42204':
                    if (product == 'CCP' || product == 'CMS') {
                        result.creditProgram = `Программа страхования жизни №3`;
                    }
                    else if (product == 'CMP' || product == 'CMP3' || product == 'CMP4') {
                        result.insurancePayment = '100% страховой суммы, но не более 1 500 000,00 рублей';
                    }
                    else {
                        result.insurancePayment = `процент от страховой суммы в соответствии с таблицей выплат (Приложение №${product == 'TERMVVTB' ? '1' : '3'} к Правилам)`;
                    }
                    break;
                case 'ITP42204':
                    result.insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (Приложение №3 к Правилам)';
                    break;
                case 'IE36904':
                    result.insurancePaymentAddCBRF = ' и дополнительный инвестиционный доход, при его наличии';
                    break;
                case 'IDLPVV36904':
                    result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                    result.insurancePaymentAddCBRF = ' и дополнительный инвестиционный доход, при его наличии';
                    break;
                case 'IDNSVV36904':
                    if (element.isUnifiedInsuranceAmount) {
                        result.sumInsured = this.formatMoneyPrint(element.riskInsuredSum);
                    }
                    else if (element.isLimitedInsuranceAmount) {
                        result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                        result.sumInsured = result.sumInsured + ', но не более ' + this.formatMoneyPrint(element.riskInsuredSum) + ' рублей';
                    }
                    else if (product.indexOf('EBMIBFKO') > -1) {
                        result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                        if (insuredAge >= 71) {
                            result.sumInsured = result.sumInsured + ', но не более 1 000 000 рублей';
                        }
                        else {
                            result.sumInsured = result.sumInsured + ', но не более 10 000 000 рублей';
                        }
                    }
                    break;
                case 'CD5C36404':
                    result.insuranceRisks = 'Первичное диагностирование Застрахованному критического заболевания';
                    result.insurancePayment = '100% страховой суммы в соответствии со Списком критических заболеваний №1';
                    break;
                case 'IH36404':
                    result.insurancePayment = `процент от страховой суммы в соответствии с таблицей выплат (Приложение №${product == 'CAPCLRELOAS' ? '1' : '3'} к Правилам)`;
                    break;
                case 'SOA36404':
                    result.insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (Приложение №4 к Правилам)';
                    break;
                case 'DLPW36404':
                    result.insurancePayment = 'освобождение от уплаты страховых взносов по основной программе';
                    result.sumInsured = 'сумма подлежащих оплате страховых взносов по основной программе на дату наступления страхового случая';
                    break;
                case 'CD636404':
                    result.insuranceRisks = 'Первичное диагностирование Застрахованному критического заболевания с освобождением от уплаты страховых взносов';
                    result.sumInsured = 'сумма подлежащих оплате страховых взносов по основной программе на дату наступления страхового случая';
                    result.insurancePayment = `освобождение от уплаты страховых взносов по основной программе в соответствии со Списком критических заболеваний${product.indexOf('CAPCLCHILD') > -1 ? '№2' : emptyValue}`;
                    break;
                case 'DLP46204':
                    result.endDate = 'пожизненно';
                    break;
                case 'DLPVV46204':
                    result.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                    break;
                case 'MHON10800':
                    result.insurancePayment = 'предоставление медицинских или иных услуг, предусмотренных Программой добровольного медицинского страхования';
                    break;
                case 'MH10800':
                    result.insurancePayment = 'предоставление медицинских или иных услуг, предусмотренных Программой добровольного медицинского страхования';
                    break;
                case 'HC20700':
                    result.insurancePayment = '1/30 от страховой суммы за каждый день стационарного лечения, начиная с 1-го дня, но не более 30 дней';
                    break;
                case 'DLP36404':
                    result.insuranceRisks = 'Смерть Застрахованного по любой причине';
                    break;
                case 'ISI20700':
                    result.insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (приложение №1 к Правилам)';
                    break;
                case 'I46204':
                    result.insurancePayment = 'процент от страховой суммы в соответствии с таблицей выплат (приложение №1 к Правилам)';
                    break;
                case 'DSS36404':
                    result.insurancePayment = 'I группа – 100% страховой суммы, II группа – 75% страховой суммы';
                    break;
                case 'ME36404':
                    if (isAnnualGuaranteedIncome) {
                        result.insuranceRisks = `Дожитие Застрахованного до дат, установленных в Договоре страхования.
                        Даты для определения наступления страхового случая по риску:
                        ${element.riskInsuredSumByPeriod.map(item => this.formatDatePrint(item.periodEndDate)).join(', ') + '.'}`;
                    }
                    break;
                case 'DMS110800':
                    result.insuranceRisks = `Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг`;
                    result.insurancePayment = 'предоставление медицинских или иных услуг, предусмотренных Программой ДМС «ЛЕЧЕНИЕ ОНКОЛОГИЧЕСКОГО ЗАБОЛЕВАНИЯ»';
                    break;
                case 'DMS210800':
                    result.insuranceRisks = `Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг`;
                    result.insurancePayment = 'предоставление медицинских или иных услуг, предусмотренных Программой ДМС «ЛЕЧЕНИЕ ОНКОЛОГИЧЕСКОГО / КРИТИЧЕСКОГО ЗАБОЛЕВАНИЯ»';
                    break;
                case 'DLP42204':
                    result.creditProgram = `Программа страхования жизни №1`;
                    if (product == 'TERMVVTB') {
                        result.insurancePayment = '100% страховой суммы';
                    } else {
                        result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                        result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 10 договора страхования.`;
                    }
                    break;
                case 'DTP42204':
                    result.insurancePayment = '100% страховой суммы';
                    break;
                case 'D42204':
                    result.creditProgram = `Программа страхования жизни №1`;
                    if (product == 'TERMVVTB') {
                        result.insurancePayment = 'I группа - 100% страховой суммы, II группа - 75% страховой суммы';
                    } else {
                        result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                        result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 10 договора страхования.`;
                    }
                    break;
                case 'CD42204':
                    result.insuranceRisks = `Первичное диагностирование Застрахованному критического заболевания`;
                    if (product == 'CMP' || product == 'CMP3' || product == 'CMP4') {
                        result.insurancePayment = '100% страховой суммы, но не более 2 500 000,00 рублей';
                        result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                        result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    }
                    else {
                        result.creditProgram = `Программа страхования жизни №2`;
                        result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                        result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 10 договора страхования.`;
                    }
                    break;
                case 'JL42204':
                    result.creditProgram = `Программа страхования жизни №4`;
                    break;
                case 'DNS42204':
                    result.insuranceRisks = `Смерть Застрахованного в результате несчастного случая`;
                    if (product == 'TERMVVTB') {
                        result.insurancePayment = '100% страховой суммы';
                    } else {
                        result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                        result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                        if (numberOfProgramm == 1 || numberOfProgramm == 2) { result.insurancePayment = '100% страховой суммы, но не более 5 000 000,00 рублей'; }
                        else { result.insurancePayment = '120% страховой суммы, но не более 5 000 000,00 рублей'; }
                    }
                    break;
                case 'DA1005042204':
                    result.insuranceRisks = `Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '100% страховой суммы при установлении I группы инвалидности, 50% страховой суммы при установлении II группы инвалидности, но не более 5 000 000,00 рублей';
                    break;
                case 'DA10010042204':
                    result.insuranceRisks = `Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '100% страховой суммы при установлении I группы инвалидности, 100% страховой суммы при установлении II группы инвалидности, но не более 5 000 000,00 рублей';
                    break;
                case 'DA12012042204':
                    result.insuranceRisks = `Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '120% страховой суммы при установлении I группы инвалидности, 120% страховой суммы при установлении II группы инвалидности, но не более 5 000 000,00 рублей';
                    break;
                case 'DIL42204':
                    result.insuranceRisks = `Смерть Застрахованного в результате болезни`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    if (numberOfProgramm == 1 || numberOfProgramm == 2) { result.insurancePayment = '100% страховой суммы, но не более 5 000 000,00 рублей'; }
                    else { result.insurancePayment = '120% страховой суммы, но не более 5 000 000,00 рублей'; }
                    break;
                case 'DNST42204':
                    result.insuranceRisks = `Смерть Застрахованного в результате несчастного случая`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '100% страховой суммы';
                    break;
                case 'DI1005042204':
                    result.insuranceRisks = `Инвалидность Застрахованного с установлением I, II группы инвалидности в результате болезни`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '100% страховой суммы при установлении I группы инвалидности, 50% страховой суммы при установлении II группы инвалидности, но не более 5 000 000,00 рублей';
                    break;
                case 'DI10010042204':
                    result.insuranceRisks = `Инвалидность Застрахованного с установлением I, II группы инвалидности в результате болезни`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '100% страховой суммы при установлении I группы инвалидности, 100% страховой суммы при установлении II группы инвалидности, но не более 5 000 000,00 рублей';
                    break;
                case 'DI12012042204':
                    result.insuranceRisks = `Инвалидность Застрахованного с установлением I, II группы инвалидности в результате болезни`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '120% страховой суммы при установлении I группы инвалидности, 120% страховой суммы при установлении II группы инвалидности, но не более 5 000 000,00 рублей';
                    break;
                case 'DAT42204':
                    result.insuranceRisks = `Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая`;
                    result.sumInsured = `На дату заключения договора страхования страховая сумма равна ` + this.formatMoneyPrint(element.riskInsuredSum) + ` рублей*`;
                    result.sumInsuredAddition = `Размер страховой суммы на любую другую дату страхового случая определяется по формуле в соответствии с п. 9 договора страхования.`;
                    result.insurancePayment = '100% страховой суммы';
                    break;
            }

            element.riskInsuredSumByPeriod.forEach(elementAdd => {
                const riskInsuredSumByPeriod = {
                    insuredSum: this.formatMoneyPrint(elementAdd.insuredSum),
                    periodStartDate: this.formatDatePrint(elementAdd.periodStartDate),
                    periodEndDate: this.formatDatePrint(elementAdd.periodEndDate),
                    insurancePayment: result.insurancePayment
                };
                result.riskInsuredSumByPeriod.push(riskInsuredSumByPeriod);
            });

            if (result.riskProgram == "additional") {
                additional.push(result);
            } else {
                mandatory.push(result);
                sum2 += +element.riskPremium;
            }

            if (result.riskPerson == "insuredPerson" && result.riskProgram == "main") {
                mainIP.push(result);
            } else if (result.riskPerson == "policyHolder" && result.riskProgram == "main") {
                mainPH.push(result);
            } else if (result.riskPerson == "insuredPerson" && result.riskProgram == "additional") {
                additionalIP.push(result);
            } else if (result.riskPerson == "policyHolder" && result.riskProgram == "additional") {
                additionalPH.push(result);
            }
        });

        const isAdditional = additional.length > 0;
        if (sum1 > 0) {
            premium.sum = this.formatMoneyPrint(sum1);
            premium.mandatory = this.formatMoneyPrint(sum2);
            premium.sumByDate = formatHelper.formatNumberToMoney(sum3, null, 2, ',', '', true);
        }

        const isMainIP = mainIP.length > 0;
        const isMainPH = mainPH.length > 0;
        const isAdditionalIP = additionalIP.length > 0;
        const isAdditionalPH = additionalPH.length > 0;

        return {
            mandatory,
            additional,
            isAdditional,
            premium,
            mainIP,
            mainPH,
            additionalIP,
            additionalPH,
            isMainIP,
            isMainPH,
            isAdditionalIP,
            isAdditionalPH
        };
    },

    getTerms: function (body) {
        const result = {};
        const insuranceTerms = parseInt(body.basicConditions.insuranceTerms);
        switch (insuranceTerms) {
            case 1:
                result.text = insuranceTerms + ' год';
                break;
            case 21:
                result.text = insuranceTerms + ' год';
                break;
            case 2:
                result.text = insuranceTerms + ' года';
                break;
            case 3:
                result.text = insuranceTerms + ' года';
                break;
            case 4:
                result.text = insuranceTerms + ' года';
                break;
            case 22:
                result.text = insuranceTerms + ' года';
                break;
            case 23:
                result.text = insuranceTerms + ' года';
                break;
            case 24:
                result.text = insuranceTerms + ' года';
                break;
            default:
                result.text = insuranceTerms + ' лет';
                break;
        }

        result.startDate = this.formatDatePrint(body.policyTerms.startDate);
        result.endDate = this.formatDatePrint(body.policyTerms.endDate);
        if (body.policyTerms.paymentPeriodLastDate) {
            result.paymentPeriodLastDate = this.formatDatePrint(body.policyTerms.paymentPeriodLastDate);
        }

        return result;
    },

    getDeclaration: function (declaration) {
        return declaration
            ?.filter(item => (item.agreementPolicyHolder && item.agreementInsuredPerson) || item.agreement)
            ?.map((element, index, array) => {
                const isLastElement = index == array.length - 1;
                const LastSymbol = element.itemText[element.itemText.length - 1];
                const isLastSymbolEnd = LastSymbol == '.' || LastSymbol == ';';
                const text = (index + 1) + ') ' + element.itemText + (isLastSymbolEnd ? emptyValue : (isLastElement ? '.' : ';'));
                return text;
            });
    },
    getDynamicDeclaration: function (input, sportsTypes) {
        const declaration = input.body.declarationMain;
        const duration = input.body.basicConditions?.coverageDuration;
        return declaration
            .filter(item => (item.agreementPolicyHolder && item.agreementInsuredPerson) || item.agreement)
            .map((element, index, array) => {
                const isLastElement = index == array.length - 1;
                const LastSymbol = element.itemText[element.itemText.length - 1];
                const isLastSymbolEnd = LastSymbol == '.' || LastSymbol == ';';
                let text = (index + 1) + ') ' + element.itemText + (isLastSymbolEnd ? emptyValue : (isLastElement ? '.' : ';'));

                text = duration === coverageDuration.wholeDay.code ? text.replace(', с покрытием по следующим видам спорта: @sportTypes@', '') : text.replace('@sportTypes@', sportsTypes);

                return text;
            });
    },

    getOtherCondition: function (object) {
        let isOtherCondition = false;
        let policySpecialConditions;

        if (object && object.policySpecialConditions) {
            isOtherCondition = true;
            policySpecialConditions = object.policySpecialConditions;
        }

        return {
            isOtherCondition,
            policySpecialConditions
        };
    },

    getSurrenderValues: function (surrenderValues, coolOffDays = 0) {
        return surrenderValues.map((element, index) => {
            if (coolOffDays > 0 && index == 0) { element.periodStartDate = DateTimeUtils.addDays(element.periodStartDate, coolOffDays); }
            return {
                index: index + 1,
                periodStartDate: this.formatDatePrint(element.periodStartDate),
                periodEndDate: this.formatDatePrint(element.periodEndDate),
                surrenderValue: this.formatMoneyPrint(element.surrenderValue)
            };
        });
    },

    getBeneficiaries: function (object, productCode) {
        let isBeneficiaries = object.isNotHeritors;
        let isBeneficiariesStandard = false;
        const beneficiaries = [];
        const beneficiariesNonAdult = [];
        const beneficiariesStandard = [];
        let shareSum = 0;
        let shareSumStandard = 0;
        let indexNonAdult = 0;
        let indexStandard = 0;

        if (productGroupArray.MEDPRO.includes(productCode)) {
            isBeneficiaries = false;
        }

        if (isBeneficiaries && object.beneficiaries && object.beneficiaries.length > 0) {
            const array = object.beneficiaries;
            array.forEach((element, indexArray) => {
                const index = indexArray + 1;
                const percentage = this.formatMoneyPrint(element.share * 100);
                const beneficiar = {
                    fullName: element.partyFullName,
                    gender: element.personGender ? (element.personGender == 'Male' ? 'Мужской' : 'Женский') : undefined,
                    dateOfBirth: this.formatDatePrint(element.dateOfBirth),
                    birthPlace: emptyValue,
                    relationType: element.relationType,
                };

                beneficiaries.push({
                    index,
                    percentage,
                    beneficiar,
                    dateOfBirthPlaceOfBirth: false,
                    phoneEmailCitizenship: false,
                    isDocument: false,
                    isRegistrationAddress: false,
                    isPostAddress: false
                });

                if (element?.beneficiaryCategory == 'NonAdult') {
                    indexNonAdult++;
                    beneficiariesNonAdult.push({
                        index: indexNonAdult,
                        percentage,
                        beneficiar,
                        dateOfBirthPlaceOfBirth: false,
                        phoneEmailCitizenship: false,
                        isDocument: false,
                        isRegistrationAddress: false,
                        isPostAddress: false
                    });
                }
                else if (element?.beneficiaryCategory == 'Standard') {
                    indexStandard++;
                    isBeneficiariesStandard = true;
                    beneficiariesStandard.push({
                        index: indexStandard,
                        percentage,
                        beneficiar,
                        dateOfBirthPlaceOfBirth: false,
                        phoneEmailCitizenship: false,
                        isDocument: false,
                        isRegistrationAddress: false,
                        isPostAddress: false
                    });
                }
            });
            shareSum = round(array.reduce((acc, v) => { acc += v.share; return acc; }, 0), 2);
            shareSumStandard = round(array.reduce((acc, v) => {
                if (v?.beneficiaryCategory == 'Standard') {
                    acc += v.share;
                }
                return acc;
            }, 0), 2);
        }
        const shareSumIsNot1 = shareSum != 1;
        const shareSumStandardIsNot1 = shareSumStandard != 1;
        /*

        ****for benefeciaries with full info****

        let isBeneficiaries = false;
        let beneficiaries = [];
        let array = object.beneficiaries;
        if (object == undefined) array = undefined;
        if (array != undefined && array.length > 0) isBeneficiaries = true;
        if (isBeneficiaries) {
            array.forEach((element, indexArray) => {
                const index = indexArray + 1;
                const percentage = element.share * 100;
                const beneficiar = this.getPerson(element.partyData);
                const phoneEmailCitizenship = beneficiar.phoneNumber != emptyValue || beneficiar.email != emptyValue || beneficiar.citizenship != emptyValue;
                const isDocument = beneficiar.document.typeAndSN != emptyValue;
                const isRegistrationAddress = beneficiar.registrationAddress != emptyValue;
                const isPostAddress = beneficiar.postAddress != emptyValue;

                beneficiaries.push({
                    index,
                    percentage,
                    beneficiar,
                    phoneEmailCitizenship,
                    isDocument,
                    isRegistrationAddress,
                    isPostAddress
                });
            });
        }
        */
        return {
            isBeneficiaries,
            beneficiaries,
            shareSumIsNot1,
            beneficiariesNonAdult,
            beneficiariesStandard,
            shareSumStandardIsNot1,
            isBeneficiariesStandard
        };
    },

    getPaymentPlan: function (array) {
        return array.map((element, indexArray) => {
            return {
                index: indexArray + 1,
                dateOfPayment: this.formatDatePrint(element.paymentExpirationDate),
                insurancePremium: this.formatMoneyPrint(element.paymentSum),
                insurancePremiumMainProgramm: element.paymentMandatory ? this.formatMoneyPrint(element.paymentMandatory) : this.formatMoneyPrint(element.paymentSum),
                periodStartDate: this.formatDatePrint(element.paymentPeriodStart),
                periodEndDate: this.formatDatePrint(element.paymentPeriodEnd)
            };
        });
    },

    getOutpaymentPlan: function (array) {
        return (array || []).map((element) => {
            return {
                periodNumber: element.periodNumber,
                outpaymentPeriodStart: this.formatDatePrint(element.outpaymentPeriodStart),
                outpaymentPeriodEnd: this.formatDatePrint(element.outpaymentPeriodEnd),
                outpaymentDidDate: element.outpaymentDidDate ? this.formatDatePrint(element.outpaymentDidDate) : 'Нет'
            };
        });
    },

    formatDatePrint: function (date) {
        return DateTimeUtils.formatDate(date, DateTimeUtils.DateFormats.CALENDAR);
    },

    formatMoneyPrint: function (num) {
        return formatHelper.formatNumberToMoney(+num);
    },

    getMemoryMain: function (input) {
        return {
            percent: '100',
            risk: 'Дожитие',
            income: '0'
        };
    },

    getMemoryCommission: function (productCode, basicConditions, paymentPlan, body) {

        const allPremium = paymentPlan.reduce((acc, cur) => { return acc += cur.paymentSum; }, 0);

        const paymentFrequencyCode = basicConditions?.paymentFrequency.paymentFrequencyCode;
        const insuranceTerms = basicConditions?.insuranceTerms;
        const issueDate = basicConditions?.issueDate;
        const currencyCode = basicConditions?.currency?.currencyCode;
        const guaranteedIncome = basicConditions?.guaranteedIncome?.guaranteedIncomeCode;
        const additionalInvestmentParameters = body.additionalInvestmentParameters;
        const rateOfReturnEquityActives = additionalInvestmentParameters?.rateOfReturnEquityActives;
        const policyCommissionItems = body.commission?.policyCommissionItems ?? [];
        const IBAVTBUltra = [product.IBAV3VTB, product.IBAV5VTB].includes(productCode);
        const isOptimalChoiceVTB = productGroupArray.OPTIMAL_CHOICE_VTB.includes(productCode);
        let ratesOfReturn = body?.technicalInformation?.ratesOfReturn ?? [];
        const rate = body?.basicInvestmentParameters?.rateOfReturn;
        let allIncome = 0;

        if (productCode && paymentFrequencyCode && insuranceTerms && issueDate) {

            const memoryCommissionConf = memoryCommissionConfiguration({ productCode, paymentFrequencyCode, insuranceTerms, issueDate });

            const manualRate_ROR = rateOfReturnEquityActives?.mf;

            if (manualRate_ROR) {

                const manualRate = policyCommissionItems[0]?.manualRate;
                const calculatedRate = policyCommissionItems[0]?.calculatedRate;
                const kvAA = manualRate ?? calculatedRate;
                const rko = rateOfReturnEquityActives?.rko ?? 0;

                const productConfMF = additionalInvestmentParameters?.mf ?? 1;
                const investmentMF_ROR = rateOfReturnEquityActives?.mf;
                const investmentMF = investmentMF_ROR ?? productConfMF;
                const insTerms = insuranceTerms ? +insuranceTerms : 1;
                const investmentFrequency = rateOfReturnEquityActives?.investmentFrequency ?? 1;

                allIncome = (kvAA + rko) * 100 + ((investmentMF * investmentFrequency) * 100 * insTerms);

            } else if (memoryCommissionConf) {
                allIncome = memoryCommissionConf.allIncome + memoryCommissionConf.rko;
            } else if (isOptimalChoiceVTB) {
                const ocManualRate = body?.basicAssetProperties?.rateOfReturnEquityActives?.manualRate || 0;
                const ocRko = body?.basicAssetProperties?.rateOfReturnEquityActives?.ocRko || 0;
                allIncome = (ocManualRate + ocRko) * 100;
            }
        }

        if (IBAVTBUltra && rate) {
            ratesOfReturn = ratesOfReturn.filter(r => r.participationCoeff == rate);
            allIncome = (ratesOfReturn[0]?.rko + ratesOfReturn[0]?.manualRate) * 100;
        }

        allIncome = round(round(allIncome, 4), 3);
        const allOutcome = round(100 - allIncome, 3);

        return {
            allPremium: allPremium,
            allOutcome: allOutcome,
            allIncome: allIncome
        };

    },

    getMemoPartner: function (code) {
        let result;

        switch (code) {
            case '15':
                result = 'банк';
                break;
            case '247457':
                result = 'агент';
                break;

            default:
                result = 'банк';
                break;
        }

        return result;
    },

    KZtreatment: function (basicConditions) {
        let numberOfProgramm;
        const paymentCode = basicConditions.paymentFrequency.paymentFrequencyCode;
        const premium = Number(basicConditions.riskPremium);

        function lumpPremium(num) {
            let result;

            switch (num) {
                case 700000:
                    result = '1';
                    break;
                case 3000000:
                    result = '2';
                    break;
                case 5000000:
                    result = '3';
                    break;
            }

            return result;
        }

        function notLumpPremium(num) {
            let result;

            switch (num) {
                case 200000:
                    result = '1';
                    break;
                case 400000:
                    result = '2';
                    break;
                case 680000:
                    result = '2';
                    break;
                case 600000:
                    result = '3';
                    break;
                case 1600000:
                    result = '3';
                    break;
            }

            return result;
        }

        switch (paymentCode) {
            case '1':
                numberOfProgramm = lumpPremium(premium);
                break;
            case '2':
                numberOfProgramm = notLumpPremium(premium);
                break;
        }

        const isFullInfo = ['2', '3'].includes(numberOfProgramm);

        return {
            numberOfProgramm,
            isFullInfo
        };
    },

    getDateToStringWithoutYear: function (date) {
        const day = date.slice(8);
        const month = Number(date.slice(5, 7));

        const monthTranslations = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        return `${day} ${monthTranslations[month - 1]}`;
    },

    getVectorInsuredSum: function (num) {
        let result = emptyValue;

        switch (num) {
            case '1':
                result = '30 000 (тридцать тысяч)';
                break;
            case '2':
                result = '75 000 (семьдесят пять тысяч)';
                break;
            case '3':
                result = '100 000 (сто тысяч)';
                break;
        }

        return result;
    },

    getExampleLabel(businessContext) {

        const configurationCodeName = businessContext && businessContext.configurationCodeName;

        if ([
            productCode.EquityLifeInsuranceQuote,
            productCode.InvestmentLifeInsuranceQuote,
            productCode.AccumulatedLifeInsuranceQuote,
            productCode.CreditLifeInsuranceQuote,
            productCode.MedLifeInsuranceQuote,
            productCode.RiskLifeInsuranceQuote,
            productCode.AccidentLifeInsuranceQuote
        ].includes(configurationCodeName)
        ) {
            return '<style>' +
                '@page {' +
                '@left-middle {' +
                'margin-top: 400px;' +
                'margin-left: 200px;' +
                'font-size: 42pt;' +
                'font-family: Arial, Helvetica, sans-serif;' +
                'color: black;' +
                'content: "ОБРАЗЕЦ";' +
                '-webkit-transform: rotate(-45deg);' +
                '-moz-transform: rotate(-45deg);' +
                '-o-transform: rotate(-45deg);' +
                '-ms-transform: rotate(-45deg);' +
                'transform: rotate(-45deg);' +
                'letter-spacing: 1em;' +
                'opacity: 0.5;' +
                'z-index: 999;' +
                '}' +
                '}' +
                '</style>';
        }

        return emptyValue;
    },

    getBottomRightContentHolder(holder) {

        return '<style>' +
            '@' + 'page' + ' signatureHolder ' + '{' +
            '@' + 'bottom-right' + '{' +
            'font-family: Arial;' +
            'font-size: 7pt;' +
            'text-align: left;' +
            'margin-left: -63mm;' +
            'margin-bottom: 8.5mm;' +
            'content: "' + holder.signatureName + '"' +
            '}' +
            '}' +
            '</style>';

    },

    getBottomRightContentBoth(holder, insured) {

        return '<style>' +
            '@' + 'page' + ' policySignature ' + '{' +
            '@' + 'bottom-right' + '{' +
            'font-family: Arial;' +
            'line-height: 6.1;' +
            'font-size: 7pt;' +
            'text-align: left;' +
            'margin-left: -63mm;' +
            'margin-bottom: -6.5mm;' +
            'content: "' + holder.signatureName + '\\A ' + insured.signatureName + '"' +
            '}' +
            '}' +
            '</style>';

    },

    getBottomLeftContentHolder(signatureSettings) {

        const signImage = this.getSignatureName(signatureSettings);

        return '<style>' +
            '@' + 'page' + ' signatureHolder ' + '{' +
            '@' + 'bottom-left' + '{' +
            'margin: 7mm 7mm 7mm 7mm;' +
            'background-image: url("TempSignatureContainer/img/' + signImage + '");' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'width: 100%;' +
            'content: ""' +
            '}' +
            '}' +
            '</style>';

    },

    getBottomLeftContentHolder2(signatureSettings) {

        const signImage = this.getSignatureName(signatureSettings);

        return '<style>' +
            '.signatureHolder2 ' + '{' +
            'height: 135px;' +
            'background-image: url("TempSignatureContainer/img/' + signImage + '");' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'width: 100%;' +
            'content: ""' +
            '}' +
            '</style>';

    },

    getBottomLeftContentBoth(signatureSettings) {

        const signImage = this.getSignatureName(signatureSettings);

        return '<style>' +
            '@' + 'page' + ' policySignature ' + '{' +
            '@' + 'bottom-left' + '{' +
            'margin: 7mm 7mm 7mm 7mm;' +
            'background-image: url("TempSignatureContainer/img/' + signImage + '");' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'width: 100%;' +
            'content: ""' +
            '}' +
            '}' +
            '</style>';

    },

    getBottomLeftContentHolderOrBoth(signatureSettings) {

        const signImage = this.getSignatureName(signatureSettings);

        return '<style>' +
            '@' + 'page' + ' signatureHolderOrBoth ' + '{' +
            '@' + 'bottom-left' + '{' +
            'margin: 7mm 7mm 7mm 7mm;' +
            'background-image: url("TempSignatureContainer/img/' + signImage + '");' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'width: 100%;' +
            'content: ""' +
            '}' +
            '}' +
            '</style>';

    },

    getBottomRightContentHolderOrBoth(settings) {

        if (settings.isChild && !settings.isGenChkHealth) {
            settings.isPolicyHolder = true;
        }

        if (settings.isPolicyHolder && !settings.isGenChkHealth) {
            return '<style>' +
                '@' + 'page' + ' signatureHolderOrBoth ' + '{' +
                '@' + 'bottom-right' + '{' +
                'font-family: Arial;' +
                'font-size: 7pt;' +
                'text-align: left;' +
                'margin-left: -63mm;' +
                'margin-bottom: 8.5mm;' +
                'content: "' + settings.holder.signatureName + '"' +
                '}' +
                '}' +
                '</style>';
        }
        return '<style>' +
            '@' + 'page' + ' signatureHolderOrBoth ' + '{' +
            '@' + 'bottom-right' + '{' +
            'font-family: Arial;' +
            'line-height: 6.1;' +
            'font-size: 7pt;' +
            'text-align: left;' +
            'margin-left: -63mm;' +
            'margin-bottom: -6.5mm;' +
            'content: "' + settings.holder.signatureName + '\\A ' + settings.insured.signatureName + '"' +
            '}' +
            '}' +
            '</style>';


    },

    getBottomLeftContentNobody(signatureSettings) {

        const cssPageName = signatureSettings.cssPageName ? signatureSettings.cssPageName : 'policySignature';
        const signImage = this.getSignatureName(signatureSettings);

        return `
            <style>
                @page ${cssPageName} {
                    @bottom-left {
                        margin: 7mm 7mm 7mm 7mm;
                        background-image: url("TempSignatureContainer/img/${signImage}");
                        background-size: contain;
                        background-repeat: no-repeat;
                        width: 100%;
                        content: "";
                    }
                }
            </style>
        `;

    },

    getPolicySignatureByIssueType(input, output, signatureSettings) {

        const body = input.body;

        const issueFormCode = body?.issueForm?.code?.issueFormCode;
        const issueDate = body?.basicConditionsbody?.issueDate;
        const isPaper = issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode;

        const holder = this.getPerson(input.body.policyHolder.partyData);
        const insured = this.getPerson(input.body.insuredPerson.partyData);

        if (!signatureSettings) {
            signatureSettings = {};
        }
        if (!signatureSettings.issueDate) {
            signatureSettings.issueDate = issueDate;
        }

        if (isPaper) {
            output.bottomRightContentHolder = this.getBottomRightContentHolder(holder); // График платежей
            output.bottomRightContentBoth = this.getBottomRightContentBoth(holder, insured); // Договор
            output.bottomLeftContentHolder = this.getBottomLeftContentHolder(signatureSettings); // График платежей
            output.bottomLeftContentBoth = this.getBottomLeftContentBoth(signatureSettings); // Договор
        } else {
            signatureSettings.isNobody = true; // Оферта, эл. полис
            output.bottomLeftContentNobody = this.getBottomLeftContentNobody(signatureSettings);
        }

    },

    getSignatureNone() {

        return '<style>' +
            '@' + 'page' + ' signatureNone ' + '{' +
            'margin: 0mm 0mm 0mm 0mm;' +
            '}' +
            '</style>';

    },

    getDifference: function (riskObj, survivalCode, deathCode) {
        let premium = 0;
        let survavialSum = 0;
        let deathSum = 0;

        riskObj.forEach(element => {
            premium += element.riskPremium;
            if (element.risk.riskCode == survivalCode) { survavialSum = element.riskInsuredSum; }
            if (element.risk.riskCode == deathCode) { deathSum = element.riskInsuredSum; }
        });

        const diffSurvavial = survavialSum - premium;
        const diffDeath = deathSum - premium;
        const printDiffSurvavial = `${this.formatMoneyPrint(diffSurvavial)} (${formatHelper.formatNumberToString(diffSurvavial, 'RUB')}) рублей`;
        const printDiffDeath = `${this.formatMoneyPrint(diffDeath)} (${formatHelper.formatNumberToString(diffDeath, 'RUB')}) рублей`;

        return {
            printDiffSurvavial,
            printDiffDeath
        };
    },

    getDifference2: function (riskObj, survivalCode, deathCode) {
        let premium = 0;
        let survavialSum = 0;
        let deathSum = 0;

        riskObj.forEach(element => {
            premium += element.riskPremium;
            if (element.risk.riskCode == survivalCode) { survavialSum = element.riskInsuredSum; }
            if (element.risk.riskCode == deathCode) { deathSum = element.riskInsuredSum; }
        });

        const diffSurvavial = survavialSum - premium;
        const diffDeath = deathSum - premium;
        const printDiffSurvavial1 = `${this.formatMoneyPrint(diffSurvavial)} рублей`;
        const printDiffSurvavial2 = `(${formatHelper.formatNumberToString(diffSurvavial, 'RUB')})`;
        const printDiffDeath1 = `${this.formatMoneyPrint(diffDeath)} рублей`;
        const printDiffDeath2 = `(${formatHelper.formatNumberToString(diffDeath, 'RUB')})`;

        return {
            printDiffSurvavial1,
            printDiffSurvavial2,
            printDiffDeath1,
            printDiffDeath2
        };
    },

    getDifference3: function (riskObj, survivalCode, deathCode, paymentPlan) {
        let premium = 0;
        let survavialSum = 0;
        let deathSum = 0;
        let wholePremium = 0;

        riskObj.forEach(element => {
            premium += element.riskPremium;
            if (element.risk.riskCode == survivalCode) { survavialSum = element.riskInsuredSum; }
            if (element.risk.riskCode == deathCode) { deathSum = element.riskInsuredSum; }
        });

        wholePremium = round(paymentPlan.reduce((p, c) => p + c.paymentSum, 0), 2);

        const diffSurvavial = survavialSum - wholePremium;
        const diffDeath = deathSum - wholePremium;
        const printDiffSurvavial1 = `${this.formatMoneyPrint(diffSurvavial)} рублей`;
        const printDiffSurvavial2 = `(${formatHelper.formatNumberToString(diffSurvavial, 'RUB')})`;
        const printDiffDeath1 = `${this.formatMoneyPrint(diffDeath)} рублей`;

        let printDiffDeath2;
        if (diffDeath < 0) {
            printDiffDeath2 = `(минус ${formatHelper.formatNumberToString(diffDeath * (-1), 'RUB')})`;
        }
        else {
            printDiffDeath2 = `(${formatHelper.formatNumberToString(diffDeath, 'RUB')})`;
        }

        return {
            printDiffSurvavial1,
            printDiffSurvavial2,
            printDiffDeath1,
            printDiffDeath2
        };
    },

    getPeriodTable: function (dateObject, investObject) {
        const { couponPeriods } = dateObject;
        const { fixRate } = investObject;
        const period = [];
        couponPeriods.forEach((element, index) => {
            period.push({
                year: index + 1,
                periodStartDate: this.formatDatePrint(element.beginDate),
                periodEndDate: this.formatDatePrint(element.endDate),
                fixRate
            });
        });

        return period;
    },

    getAge: function (dob, issueDate) {
        const diff = DateTimeUtils.getYearNumber(dob, issueDate);
        return diff >= 60;
    },

    getPersonData: function (person, input) {

        const isGenderMale = input.partyBody.partyPersonData?.personGender == 'Male';
        let isRussiaCountry = false;
        if (input.partyBody?.partyAddresses?.length > 0) {
            isRussiaCountry = input.partyBody.partyAddresses[0].fullAddress?.data?.country == 'Россия';
        }

        const isCitizenshipRusssia = getValue(input, 'partyBody.partyPersonData.citizenship', []).some(element => element.alfa3 == 'RUS');

        let isRusssiaPassport = false;
        let isForeignTravelPassport = false;
        let isBirthCertificate = false;
        let isOtherDocument = false;
        let isMilitaryID = false;
        const partyDocuments = getValue(input, 'partyBody.partyDocuments', []);
        const typeOfDOcument = partyDocuments[0]?.docType?.docTypeCode;
        switch (typeOfDOcument) {
            case 'passport':
                isRusssiaPassport = true;
                break;
            case 'foreignTravelPassport':
                isForeignTravelPassport = true;
                break;
            case 'birthCertificate':
                isBirthCertificate = true;
                break;
            case 'militaryID':
                isMilitaryID = true;
                break;
            default:
                isOtherDocument = true;
                break;
        }
        const { docSeries, docNumber, issueDate, issuerName, issuerCode } = partyDocuments[0] || {};
        const typeOfDOcumentDesc = partyDocuments[0]?.docType?.docTypeDesc;

        const partyAddresses = getValue(input, 'partyBody.partyAddresses', []);
        const regAddressIndex = partyAddresses.findIndex(element => element.addressType.addressTypeCode == 'R');
        const factAddressIndex = partyAddresses.findIndex(element => element.addressType.addressTypeCode == 'F');

        let regAddress = {};
        let regFullAddress = emptyValue;
        let regFullAddressWithType = emptyValue;
        if (partyAddresses.length > 0 && regAddressIndex >= 0) {
            regAddress = partyAddresses[regAddressIndex];
            regFullAddress = this.getFullAddress(regAddress);
            regFullAddressWithType = this.getFullAddressWithType(regAddress);
        }

        let factAddress = {};
        let factFullAddress = emptyValue;
        let factFullAddressWithType = emptyValue;
        let isSameAsRegistration = false;
        if (partyAddresses.length > 0 && factAddressIndex >= 0) {
            factAddress = partyAddresses[factAddressIndex];
            factFullAddress = this.getFullAddress(factAddress);
            factFullAddressWithType = this.getFullAddressWithType(factAddress);
            isSameAsRegistration = factAddress.isSameAsRegistration;
        }

        const INN = input.partyBody.partyGeneralData?.INNKIO;
        const SNILS = input.partyBody.partyPersonData?.SNILS;

        return {
            ...person,
            isGenderMale,
            isCitizenshipRusssia,
            isRusssiaPassport,
            isForeignTravelPassport,
            isBirthCertificate,
            isOtherDocument,
            docSeries,
            docNumber,
            issueDate,
            issuerName,
            issuerCode,
            isSameAsRegistration,
            regFullAddress,
            factFullAddress,
            INN,
            SNILS,
            regAddress,
            factAddress,
            typeOfDOcumentDesc,
            isRussiaCountry,
            regFullAddressWithType,
            factFullAddressWithType
        };

    },

    getFullAddress: function (addressObject) {
        let result = emptyValue;
        const { country, region, area, city, settlement, street, house, flat, postalCode, isForeignAddress, isManualAddress } = addressObject;

        if (isManualAddress || isForeignAddress) {
            result = addressObject.fullAddress.value;
        } else {
            [country, postalCode, region, area, city, settlement, street, house, flat].forEach((element, index) => {
                if (index == 0) {
                    result += `${element}`;
                } else {
                    result += element == emptyValue ? emptyValue : `, ${element}`;
                }
            });
        }

        return result;
    },

    getFullAddressWithType: function (addressObject) {
        let result = emptyValue;
        const { country, region, area, city, settlement, street, house, flat, postalCode, isForeignAddress, isManualAddress } = addressObject;
        const street_with_type = addressObject.fullAddress?.data?.street_with_type ? addressObject.fullAddress?.data?.street_with_type : emptyValue;
        const clrStreet = / улица|ул. |ул /gi;

        if (isManualAddress || isForeignAddress) {
            result = addressObject.fullAddress.value;
        } else {
            [country, postalCode, region, area, city, settlement, street_with_type ? street_with_type.replaceAll(clrStreet, emptyValue) : emptyValue, house, flat].forEach((element, index) => {
                if (index == 0) {
                    result += `${element}`;
                } else {
                    result += element == emptyValue ? emptyValue : `, ${element}`;
                }
            });
        }

        return result;
    },

    getRiskFinReserv: function (riskArray, risksPackages, productCode) {

        const mainRisks = riskArray.mandatory.filter(element => {
            if (element.riskCode == "E36404" || element.riskCode == "DLPSS36404" || element.riskCode == "DVV36404" || element.riskCode == "DAVV36404") {
                return element;
            }
        });
        const selectedPackages = getValue(risksPackages, 'selectedPackages', []);
        const isSelectedPackages = selectedPackages.length > 0;
        const isPackage1 = selectedPackages.some(element => element.packageCode == "EFRBFKO1" || element.packageCode == "ECOFPVTB1" || element.packageCode == "ECOFVVTB1" || element.packageCode == "ECOF2ZENIT1");
        const isPackage2 = selectedPackages.some(element => element.packageCode == "EFRBFKO2" || element.packageCode == "ECOFPVTB2" || element.packageCode == "ECOFVVTB2" || element.packageCode == "ECOF2ZENIT2");
        const isPackage3 = selectedPackages.some(element => element.packageCode == "EFRBFKO3" || element.packageCode == "ECOFPVTB3" || element.packageCode == "ECOFVVTB3" || element.packageCode == "ECOF2ZENIT3");
        const isPackage4 = selectedPackages.some(element => element.packageCode == "ECOF2ZENIT4");
        let package1 = [];
        let package2 = [];
        let package3 = [];
        let package4 = [];
        let isMedRussia = false;
        let isMedWorld = false;
        if (isPackage1) {
            package1 = riskArray.additional.filter(element => {
                if (element.riskCode == "DNS36404" || element.riskCode == "DTP36404") {
                    return element;
                }
            });
        }
        if (isPackage2) {
            package2 = riskArray.additional.filter(element => {
                if (element.riskCode == "CTDA36404" || element.riskCode == "DASS36404") {
                    return element;
                }
            });
        }
        if (isPackage3) {
            package3 = riskArray.additional.filter(element => {
                if (element.riskCode == "CDP36404" || (element.riskCode == "CDVV36404" && !['ECOF2ZENIT'].includes(productCode)) || element.riskCode == "CDHR10800" || element.riskCode == "CDHW10800") {
                    return element;
                }
            });
            isMedRussia = riskArray.additional.some(element => element.riskCode == "CDHR10800");
            isMedWorld = riskArray.additional.some(element => element.riskCode == "CDHW10800");
        }
        if (isPackage4) {
            package4 = riskArray.additional.filter(element => {
                if (element.riskCode == "CDVV36404") {
                    return element;
                }
            });
        }

        return {
            mainRisks,
            isSelectedPackages,
            isPackage1,
            isPackage2,
            isPackage3,
            package1,
            package2,
            package3,
            package4,
            isPackage4,
            isMedRussia,
            isMedWorld
        };
    },

    getRiskTermLife: function (riskArray, risksPackages) {

        const mainRisks = riskArray.mandatory.filter(element => {
            if (element.riskCode == "DLP42204" || element.riskCode == "D42204") {
                return element;
            }
        });
        const selectedPackages = getValue(risksPackages, 'selectedPackages', []);
        const isSelectedPackages = selectedPackages.length > 0;
        const isPackage1 = selectedPackages.some(element => element.packageCode == "TERMVVTB1");
        const isPackage2 = selectedPackages.some(element => element.packageCode == "TERMVVTB2");
        const isPackage3 = selectedPackages.some(element => element.packageCode == "TERMVVTB3");
        let package1 = [];
        let package2 = [];
        let package3 = [];
        let isMedRussia = false;
        let isMedWorld = false;
        if (isPackage1) {
            package1 = riskArray.additional.filter(element => {
                if (element.riskCode == "DNS42204" || element.riskCode == "DTP42204" || element.riskCode == "I42204") {
                    return element;
                }
            });
        }
        if (isPackage2) {
            package2 = riskArray.additional.filter(element => {
                if (element.riskCode == "CDHR10800" || element.riskCode == "CDHW10800") {
                    return element;
                }
            });
            isMedRussia = riskArray.additional.some(element => element.riskCode == "CDHR10800");
            isMedWorld = riskArray.additional.some(element => element.riskCode == "CDHW10800");
        }
        if (isPackage3) {
            package3 = riskArray.additional.filter(element => {
                if (element.riskCode == "CDHR10800" || element.riskCode == "CDHW10800") {
                    return element;
                }
            });
            isMedRussia = riskArray.additional.some(element => element.riskCode == "CDHR10800");
            isMedWorld = riskArray.additional.some(element => element.riskCode == "CDHW10800");
        }

        return {
            mainRisks,
            isSelectedPackages,
            isPackage1,
            isPackage2,
            isPackage3,
            package1,
            package2,
            package3,
            isMedRussia,
            isMedWorld
        };
    },

    getNoticeBFKO: function (email, phoneNumber, issueDate) {
        let isEmail = false;
        let isPhoneNumber = false;

        if (email != 'Отсутствует') { isEmail = true; }
        if (phoneNumber.length == 18) { isPhoneNumber = true; }

        const bool = (isEmail || isPhoneNumber);

        issueDate = dateToStringDocumentationFormat(issueDate);

        return {
            bool,
            isEmail,
            email,
            isPhoneNumber,
            phoneNumber,
            issueDate
        };
    },

    getSurrenderValuesWithRisk: function (surrenderValuesArray, risksArray, riskCode) {

        let result = [];

        if ((surrenderValuesArray.length > 0) && (risksArray.length > 0) && riskCode) {

            const riskIndex = risksArray.findIndex(element => element.risk.riskCode == riskCode);
            const riskPeriod = risksArray[riskIndex]?.riskInsuredSumByPeriod;

            result = surrenderValuesArray.map((element, index) => {
                return {
                    ...element,
                    riskSum: riskPeriod ? this.formatMoneyPrint(riskPeriod[index]?.insuredSum) : 0
                };
            });
        }

        return result;
    },

    getEpolicyInfo: function (personObject, ePolicyObject) {

        const result = { ...personObject };

        result.email = ePolicyObject.email ? ePolicyObject.email : result.email;
        result.phoneNumber = ePolicyObject.phoneNumber ? ePolicyObject.phoneNumber : result.phoneNumber;

        return result;
    },

    getRiskAvtoCred: function (riskArray, creditProgramId, annuityPaymentSum) {

        const result = { ...riskArray };

        switch (creditProgramId) {
            case 'РЖ30':
                result.firstStep = [riskArray.mandatory[0], riskArray.mandatory[1], riskArray.mandatory[3]];
                result.secondStep = [riskArray.mandatory[2]];
                break;
            case 'РЖ27':
                riskArray.mandatory[3].insurancePayment = `в соответствии с п. 10.9 Правил, но не более максимального лимита ежемесячной страховой выплаты – ${this.formatMoneyPrint(annuityPaymentSum)} рублей`;
                result.firstStep = [riskArray.mandatory[0], riskArray.mandatory[1]];
                if (riskArray.mandatory.length > 2) {
                    result.secondStep = riskArray.mandatory.filter((value, index) => index > 1);
                }
                break;
            default:
                result.firstStep = [riskArray.mandatory[0], riskArray.mandatory[1]];
                if (riskArray.mandatory.length > 2) {
                    result.secondStep = riskArray.mandatory.filter((value, index) => index > 1);
                }
                break;
        }

        return result;
    },

    getRiskSummArray: function (riskArray, mainRisk, columNumber) {
        // main risk is first element
        /* for one colum
        return riskArray[0].riskInsuredSumByPeriod.map((elementArr, indexArr) => {
            return {
                index: indexArr + 1,
                number: this.formatMoneyPrint(elementArr.insuredSum)
            };
        });
        */
        const result = [];

        const mainRiskArray = riskArray[mainRisk].riskInsuredSumByPeriod;

        const rowNumber = Math.ceil(mainRiskArray.length / columNumber);

        for (let indexA = 0; indexA < rowNumber; indexA++) {

            const object = {};

            for (let indexB = 0; indexB < columNumber; indexB++) {

                const specialIndex = indexA + rowNumber * indexB;

                object[`index${indexB + 1}`] = specialIndex < mainRiskArray.length ? specialIndex + 1 : null;
                object[`number${indexB + 1}`] = specialIndex < mainRiskArray.length ? this.formatMoneyPrint(mainRiskArray[specialIndex]?.insuredSum) : null;

            }

            result.push(object);
        }

        return result;
    },

    getCoolDownData: function (person, input) {

        const personData = input.partyBody.partyPersonData;
        const lastName = personData.lastName;
        const firstName = personData.firstName;
        const middleName = personData.middleName;

        return {
            ...person,
            lastName,
            firstName,
            middleName
        };
    },

    getBankNumber: function (bankArray) {

        let result = {};

        if (bankArray.length > 0) {

            const currentDate = DateTimeUtils.newDateAsString(DateTimeUtils.DateFormats.ECMASCRIPT);

            const bankAcctual = bankArray.filter(element => {
                const closingDate = element.closingDate || currentDate;
                return DateTimeUtils.isAfter(closingDate);
            });

            if (bankAcctual.length > 0) { result = bankAcctual[bankAcctual.length - 1]; }

        }

        return result;
    },

    getSurrenderValues2row: function (array) {

        const result = [];
        let flag = true;
        let index = 0;

        while (flag) {
            result.push(array[index]);
            flag = array[index] && array[index].surrenderValue == '0,00';
            index += 1;
        }

        result[result.length - 1].periodEndDate = 'пожизненно';

        return result;
    },

    getRisk2row: function (array) {

        const DLPVV46204 = array.mandatory.filter(item => item.riskCode == 'DLPVV46204')[0];
        const DLP46204 = array.mandatory.filter(item => item.riskCode == 'DLP46204')[0];
        const DDTP46204 = array.mandatory.filter(item => item.riskCode == 'DDTP46204')[0];
        const DLP46204M = array.mandatory.filter(item => item.riskCode == 'DLP46204M')[0];
        let DLP46204M_FirstTwoYears, DLP46204M_ForLife;

        if (DLP46204M) {

            DLP46204M_FirstTwoYears = Object.assign({}, DLP46204M);
            DLP46204M_ForLife = Object.assign({}, DLP46204M);

            if (DLP46204M.startDate) {
                const startDateForLife = DateTimeUtils.addYears(DateTimeUtils.parseLocalDateToISO(DLP46204M.startDate), 2);
                const endDateFirstTwoYears = DateTimeUtils.substractDays(startDateForLife, 1);
                DLP46204M_FirstTwoYears.endDate = DateTimeUtils.formatDate(endDateFirstTwoYears, 'dd.MM.yyyy');
                DLP46204M_ForLife.startDate = DateTimeUtils.formatDate(startDateForLife, 'dd.MM.yyyy');

                DLP46204M_FirstTwoYears.sumInsured = 'в размере фактически уплаченных страховых взносов по договору страхования на дату страхового случая';
                DLP46204M_ForLife.endDate = 'пожизненно';
            }
        }

        return {
            DLPVV46204,
            DLP46204,
            DDTP46204,
            DLP46204M,
            DLP46204M_ForLife,
            DLP46204M_FirstTwoYears
        };

    },

    getSignatureNameByHolder: function (signatureSettings) {
        if (signatureSettings.isOffer || signatureSettings.isNobody || signatureSettings.ePolicy) {
            return 'Nobody';
        }
        if (signatureSettings.isPolicyHolder || signatureSettings.signatureOnlyForHolder) {
            return 'Holder';
        }
        return 'Both';
    },

    getSignatureNameByDate: function (signatureSettings) {
        if (signatureSettings.issueDate <= DateTimeUtils.formatDate('2022-01-31')) {
            return '20201229';
        }
        if ((signatureSettings.issueDate > DateTimeUtils.formatDate('2022-01-31')) && (signatureSettings.issueDate <= DateTimeUtils.formatDate('2022-12-20'))) {
            return '20220201';
        }
        if ((signatureSettings.issueDate > DateTimeUtils.formatDate('2022-12-20')) && (signatureSettings.issueDate <= DateTimeUtils.formatDate('2024-10-06'))) {
            return '20221101';
        }
        if ((signatureSettings.issueDate > DateTimeUtils.formatDate('2024-10-06'))) {
            return '20241007';
        }
        return '20221101';
    },

    getSignatureNameByAdditionalOptions: function (signatureSettings) {
        if (signatureSettings.isChild && !signatureSettings.isGenChkHealth) {
            return 'Child';
        }
        if (signatureSettings.isChildOne) {
            return 'ChildOne';
        }
        if (signatureSettings.isDate) {
            return 'Date';
        }
        return emptyValue;
    },

    getSignatureName: function (signatureSettings) {
        const holder = this.getSignatureNameByHolder(signatureSettings);
        const date = this.getSignatureNameByDate(signatureSettings);
        const additional = this.getSignatureNameByAdditionalOptions(signatureSettings);

        return `tempSignature${holder}${date}${additional}.png`;
    },

    getSignatureLink: function (signatureName) {
        return `<img src="TempSignatureContainer/img/${signatureName}" alt="signature" class="signature">`;
    },

    setRunningTitleForPage(pageMargin, pagePadding, pageNumber, pageClass, titleLocation, runningTitleStyles) {
        return `
            <style>
                @page :-ro-nth(${pageNumber} of ${pageClass}) {
                margin: ${pageMargin};
                padding: ${pagePadding};
                @${titleLocation} ${runningTitleStyles} }
            </style>
        `;
    },

    setRunningTitleStyle(content, fontSize = '8pt') {
        return `
            {
                position: absolute;
                bottom: 12mm !important;
                left: 10mm !important;
                content: ${content};
                width: justify;
                padding-right: 10mm;
                font-family: Arial, sans-serif;
                font-size: ${fontSize};
                text-align: justify;
            }
        `;
    },

    twoPartRisk: function (riskArray, productCode) {
        let riskFirstPart = [];
        let riskSecondPart = [];

        if (productCode == 'EBMPFBFKO') {
            riskFirstPart = [riskArray.mandatory[0], riskArray.mandatory[1]];
            riskSecondPart = [riskArray.mandatory[2], riskArray.mandatory[3]];
        }

        return {
            riskFirstPart,
            riskSecondPart
        };
    },

    getBottomLeftContentChildHolder(signatureSettings) {

        const signImage = this.getSignatureName(signatureSettings);

        return '<style>' +
            '@' + 'page' + ' policySignature ' + '{' +
            '@' + 'bottom-left' + '{' +
            'margin: 7mm 7mm 7mm 7mm;' +
            'background-image: url("TempSignatureContainer/img/' + signImage + '");' +
            'background-size: contain;' +
            'background-repeat: no-repeat;' +
            'width: 100%;' +
            'content: ""' +
            '}' +
            '}' +
            '</style>';

    },

    getBottomRightContentChildHolder(holder) {
        return '<style>' +
            '@' + 'page' + ' policySignature ' + '{' +
            '@' + 'bottom-right' + '{' +
            'font-family: Arial;' +
            'font-size: 7pt;' +
            'text-align: left;' +
            'margin-left: -63mm;' +
            'margin-bottom: 8.5mm;' +
            'content: "' + holder.signatureName + '"' +
            '}' +
            '}' +
            '</style>';
    },

    setGiftServiceMemoRule(appendix, additionalServices, input) {
        const skipGiftValid = !additionalServices.some(item => input?.body?.giftServices?.selectedGiftServices?.giftServiceCodes.includes(item.serviceCode));
        // ПРО Здоровье
        if (additionalServices.some(item => [giftServices.MED85, giftServices.MED852].includes(item.serviceCode))) {
            appendix.push({
                name: `CommonAppendixImageContainer/img/memoHealthService.pdf`,
                mode: 'Append'
            });
        }

        // ПРО ЗОЖ
        if (additionalServices.some(item => item.serviceCode == giftServices.MED86)) {
            appendix.push({
                name: `CommonAppendixImageContainer/img/memoZozhService.pdf`,
                mode: 'Append'
            });
        }

        // ПРО Генетику
        if (additionalServices.some(item => [giftServices.MED87, giftServices.MED88, giftServices.MED89].includes(item.serviceCode)) && !skipGiftValid) {
            appendix.push({
                name: `CommonAppendixImageContainer/img/memoGenCheckService.pdf`,
                mode: 'Append'
            });
        }

        // Генетический паспорт «Сила генетики»
        if (additionalServices.some(item => item.serviceCode == giftServices.MED96)) {
            appendix.push({
                name: `CommonAppendixImageContainer/img/memoGenPowerService.pdf`,
                mode: 'Append'
            });
        }

        // Здоровый образ жизни
        if (additionalServices.some(item => item.serviceCode == giftServices.MED97)) {
            appendix.push({
                name: `CommonAppendixImageContainer/img/memoHealthLifestyleService.pdf`,
                mode: 'Append'
            });
        }
    },

    reducePrintoutPagesTotalNumber(reduceByNumber = 2) {
        return `<style>
                @-ro-preferences {
                    pages-counter-offset: -${reduceByNumber};
                }
        '</style>`;
    },

    setKidPrintoutTopRunningTitle() {
        return `<style>
                .kidPage {
                    page: kidGroup;
                }
                @page :-ro-nth(n of kidGroup) {
                    size: A4 portrait;
                    margin: 0mm 0mm 10mm 0mm;
                    padding: 10mm 7mm 0mm 7mm;
                    counter-increment: kidCounter 1;
                    @top-center {
                        margin-top: 25px !important;
                        content: counter(kidCounter);
                        width: 8%;
                        font-family: Arial, sans-serif;
                        font-size: 8pt;
                    }
                }
        '</style>`;
    },

    setPolicyPrintoutRunningTitleIfKidExist(isKidPrintout) {
        if (isKidPrintout) {
            return `<style>
                .policyPage {
                    page: policyGroup;
                }
                @page :-ro-nth(n of policyGroup) {
                    counter-increment: policyCounter 1;
                    @bottom-center {
                        position: absolute;
                        bottom: 25px !important;
                        content: counter(policyCounter)"/" counter(pages);
                        width: 8%;
                        font-family: Arial, sans-serif;
                        font-size: 8pt;
                    }
                }
            '</style>`;
        }
        return `<style>
                @page {
                    @bottom-center {
                        position: absolute;
                        bottom: 25px !important;
                        content: counter(page)"/"counter(pages);
                        width: 8%;
                        font-family: Arial, sans-serif;
                        font-size: 8pt;
                    }
                }
        '</style>`;

    },

    getReduceNumberForTotalPages(input, kidIsMulti) {

        const kidDefaultReduceNumber = 2; // Количество всех страниц - Количество страниц КИД для CSS
        const kidMultiCoef = 2; // Количество ПФ КИД

        const kidReducePageNumber = kidIsMulti ? kidDefaultReduceNumber * kidMultiCoef : kidDefaultReduceNumber;

        return kidReducePageNumber;

    },

    getKidBottomRunningTitle(input, pageNumber) {

        const fontSize = '6pt';
        let kidBottomRunningTitle = emptyValue;
        let content = emptyValue;
        // margin and padding такие же как в configuration\@config-rgsl\life-insurance\printouts\KIDPrintout\styles\style.css
        const marginForRunningTitle = '0mm 0mm 20mm 0mm'; // Увеличиваем отступ только для нижнего колонтитула для конкретной страницы
        const paddingForRunningTitle = '10mm 7mm 0mm 7mm';
        const pageClass = 'kidGroup';
        const titleLocation = 'bottom-left';

        const currentProductCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
        const IS_KID_NSG = productGroupArray.KID_NSG.includes(currentProductCode);
        const IS_KID_BASIS_GARANT = productGroupArray.KID_BASIS_GARANT.includes(currentProductCode);
        const IS_KID_DRIVER_MIL_GARANT = productGroupArray.KID_DRIVER_MIL_GARANT.includes(currentProductCode);
        const IS_KID_CAPCLCHILDBOX = productGroupArray.KID_CAPCLCHILDBOX.includes(currentProductCode);
        const IS_KID_CAPCLCHILD = productGroupArray.KID_CAPCLCHILD.includes(currentProductCode);
        const IS_KID_CREDIT = productGroupArray.KID_CREDIT.includes(currentProductCode);
        const IS_KID_ECATF = productGroupArray.ECATF.includes(currentProductCode);

        if (pageNumber == 1) {
            if (IS_KID_NSG || IS_KID_BASIS_GARANT || IS_KID_DRIVER_MIL_GARANT || IS_KID_CAPCLCHILDBOX || IS_KID_CAPCLCHILD || IS_KID_CREDIT || IS_KID_ECATF) {
                content = `'___________________________________________ \\A \\00B9 \\0020 Перечень социально значимых заболеваний: туберкулез, инфекции, передающиеся преимущественно половым путем, гепатит В, гепатит С, болезнь, вызванная вирусом иммунодефицита человека (ВИЧ), злокачественные новообразования, сахарный диабет, психические расстройства и расстройства поведения, болезни, характеризующиеся повышенным кровяным давлением, а также сердечно-сосудистые заболевания, цирроз печени.'`;
                const runningTitleStyle = this.setRunningTitleStyle(content, fontSize);
                kidBottomRunningTitle = this.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, pageNumber, pageClass, titleLocation, runningTitleStyle);
            }
        }
        if (pageNumber == 2) {
            //
        }
        if (pageNumber == 3) {
            //
        }
        return kidBottomRunningTitle;
    },

    prepareProductNameForKidPrintout(input) {

        const body = input.body;
        const currentProductCode = body.mainInsuranceConditions.insuranceProduct.productCode;
        const kidIsCAPCLRELBOXOAS = currentProductCode == lifeInsuranceConstants.product.CAPCLRELBOXOAS;
        const kidIsCAPCLCHILDBOXOAS = currentProductCode == lifeInsuranceConstants.product.CAPCLCHILDBOXOAS;

        let kidProductName = body.mainInsuranceConditions.insuranceProduct.productDescription;
        const regexYears = /(\s\(\w+\s+\D+\))/ig;
        kidProductName = kidProductName ? kidProductName.replace(' (коробка)', emptyValue) : emptyValue;
        kidProductName = kidProductName ? kidProductName.replace('Восстанови здоровье вариант Базовый', 'Восстанови здоровье» вариант «Базовый') : emptyValue;
        kidProductName = kidProductName ? kidProductName.replace('Восстанови здоровье вариант Оптима', 'Восстанови здоровье» вариант «Оптима') : emptyValue;
        kidProductName = kidProductName ? kidProductName.replace(' с периодической выплатой дохода', emptyValue) : emptyValue;
        kidProductName = kidProductName.replace(regexYears, emptyValue);
        kidProductName = `«${kidProductName}»`;
        kidProductName = kidProductName ? kidProductName.replace('»»', '»') : emptyValue;

        return kidProductName;
    },

    setKidPrintoutMapping(input, that, kidIsMulti) {

        const body = input.body;
        const { policy } = this.getPollicyInfo(input, that);
        const kidInsurer = printoutsConstant.insurerInfo;
        const kidIssueDate = this.formatDatePrint(input.body.basicConditions.issueDate);
        const kidPolicyHolderFullName = body.policyHolder.partyData.partyFullName;
        const kidProductName = this.prepareProductNameForKidPrintout(input);
        const kidRuleDescription = policy.rule;
        const kidPolicyNumber = policy?.number;
        const kidBarCodePolicyNumber = policy?.number ? policy?.number.replace('-', '') : '';
        const kidIsPolicy = input?.kidIsPolicy;
        const product = lifeInsuranceConstants.product;
        const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
        const kidIsBarCodeNeed = kidIsPolicy && [product.EBMGPB, product.IDGP2PB, product.IDGP3PB, product.IDGP5PB].includes(productCode);
        const kidIsBarCodeNewLine = kidIsPolicy && [product.IDGP2PB, product.IDGP3PB, product.IDGP5PB].includes(productCode);
        const kidRuleLinkQR = this.getQRRuleLink(body);
        const kidIsPaper = body?.issueForm?.code?.issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode;

        // Total pages number calculation for CSS
        const kidReducePageNumber = this.getReduceNumberForTotalPages(input, kidIsMulti);

        // Bottom running title for first page
        const setKidPrintoutBottomRunningTitleFirstPage = this.getKidBottomRunningTitle(input, 1);

        const output = {
            kidRuleLinkQR,
            kidProductName,
            kidRuleDescription,
            kidInsurer,
            kidIsPaper,
            kidIssueDate,
            kidPolicyHolderFullName,
            kidReducePageNumber,
            setKidPrintoutBottomRunningTitleFirstPage,
            kidPolicyNumber,
            kidIsBarCodeNeed,
            kidIsBarCodeNewLine,
            kidBarCodePolicyNumber
        };

        // Multi KID printout
        output.kidMulti = [];
        output.insuredPersonObj = {};
        output.policyHolderObj = {};

        // Раздел I. ЧТО ЗАСТРАХОВАНО?
        output.kidWhatIsInsuredSection = getKidWhatIsInsuredSection(body, output, kidIsMulti);

        // Раздел II. ЧТО НЕ ЗАСТРАХОВАНО?
        output.kidWhatIsNotInsuredSection = getKidWhatIsNotInsuredSection(body, output, kidIsMulti);

        // Раздел III. ТЕРРИТОРИЯ СТРАХОВАНИЯ
        output.kidInsuranceTerritorySection = getKidInsuranceTerritorySection(body, output, kidIsMulti);

        // Раздел IV. КАК ПОЛУЧИТЬ СТРАХОВУЮ ВЫПЛАТУ?
        output.kidInsurancePaymentSection = getKidGetInsurancePaymentSection(body, output, kidIsMulti);

        // Раздел V. КАК ВЕРНУТЬ СТРАХОВУЮ ПРЕМИЮ
        output.kidReasonsToReturnPremiumSection = getKidReasonsToReturnPremiumSection(body, output, kidIsMulti);
        output.kidInsurancePremiumRefundAmont = getKidInsurancePremiumRefundAmont(body);
        output.kidOtheCasesToReturnPremiumSection = getKidOtheCasesToReturnPremiumSection(body, output, kidIsMulti);
        output.kidDaysToReturnPremiumSection = getKidDaysToReturnPremiumSection(body, output, kidIsMulti);

        // Multi KID printout
        if (kidIsMulti) {
            const kidMultiCommonObjData = {
                kidRuleLinkQR: kidRuleLinkQR,
                kidProductName: kidProductName,
                kidRuleDescription: kidRuleDescription,
                kidInsurer: kidInsurer,
                kidIsPaper: kidIsPaper,
                kidIssueDate: kidIssueDate,
                kidInsuranceTerritorySection: output.kidInsuranceTerritorySection,
                kidInsurancePaymentSection: output.kidInsurancePaymentSection,
                kidReasonsToReturnPremiumSection: output.kidReasonsToReturnPremiumSection,
                kidInsurancePremiumRefundAmont: output.kidInsurancePremiumRefundAmont,
                kidOtheCasesToReturnPremiumSection: output.kidOtheCasesToReturnPremiumSection,
                kidDaysToReturnPremiumSection: output.kidDaysToReturnPremiumSection
            };
            output.insuredPersonObj = Object.assign(output.insuredPersonObj, kidMultiCommonObjData);
            output.policyHolderObj = Object.assign(output.policyHolderObj, kidMultiCommonObjData);
            output.insuredPersonObj.kidFullName = body.insuredPerson.partyData.partyFullName;
            output.policyHolderObj.kidFullName = body.policyHolder.partyData.partyFullName;
            output.kidMulti.push(output.insuredPersonObj, output.policyHolderObj);
        }

        return output;

    },

    setKidCreditPrintoutMapping(input, that) {

        const body = input.body;
        const { policy, isPremial, currency, experationDate } = this.getPollicyInfo(input, that);
        const kidInsurer = printoutsConstant.insurerInfo;
        const kidIssueDate = this.formatDatePrint(input.body.basicConditions.issueDate);
        const currentProductCode = body.mainInsuranceConditions.insuranceProduct.productCode;
        const kidProductName = this.prepareProductNameForKidPrintout(input);
        const kidRisk = this.getRisk(body, body.risks, currentProductCode);
        const kidRiskCodes = body.risks ? body.risks.map(item => item.risk.riskCode) : [];
        const kidRuleDescription = policy.rule;
        const kidRuleLinkQR = this.getQRRuleLink(body);
        const selectedPackages = getValue(body, 'risksPackages.selectedPackages', []);
        const riskMandatory = kidRisk.mandatory;
        const riskAdditional = kidRisk.additionalIP;
        const mainRisks = body.risks.filter(item => item.risk.riskProgram == 'main');
        const additionalRisks = body.risks.filter(item => item.risk.riskProgram == 'additional');
        const kidInsuranceRisksNames = mainRisks && mainRisks.length > 0 ? mainRisks.map(item => item.risk.riskFullDescription).join('; ') : emptyValue;
        const kidInsuranceRisksNamesAdditional = additionalRisks && additionalRisks.length > 0 ? '; ' + additionalRisks.map(item => item.risk.riskFullDescription).join('; ') : emptyValue;
        const kidInsuranceRisksNamesReDefined = riskMandatory && riskMandatory.length > 0 ? riskMandatory.map(item => item.insuranceRisks).join('; ') : emptyValue;
        const kidInsuranceRisksNamesAdditionalReDefined = riskAdditional && riskAdditional.length > 0 ? '; ' + riskAdditional.map(item => item.insuranceRisks).join('; ') : emptyValue;
        const kidIsInjury = selectedPackages?.filter(item => item.packageCode == packageCode.I46204).length > 0;
        const kidIsPaper = body?.issueForm?.code?.issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode;
        const kidSelectedPackagesNames = selectedPackages && selectedPackages.length > 0 ? '; ' + selectedPackages.map(item => item.packageName).join('; ') + '.' : '.';
        const kidPolicyHolderFullName = body.policyHolder.partyData.partyFullName;
        const kidIsERCNotInsuredDisability = checkAvailabilitySome(kidRiskCodes, [
            'D36404', 'D36102', 'D33302', 'DAIW33102', // Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине с освобождением от уплаты страховых взносов
            'DAIW36102', 'DAIA36102', // Инвалидность Застрахованного с установлением I группы инвалидности по любой причине
            'MDII20600', // ?? Инвалидность Застрахованного с установлением II группы инвалидности по любой причине
            'DVV36404', 'D42204', 'DSS36404', // Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине
        ]);
        const kidIsERCNotInsuredCriticalDisease = checkAvailabilitySome(kidRiskCodes, [
            'M6CD36102', 'CD36404', 'CD3T42204', 'CDT42204', 'M5CD36102', 'CD10C36102', 'CD5C36404', 'CDP36404', 'CDHW10800', 'M6CD33102', 'CDP42204', // Первичное диагностирование Застрахованному критического заболевания
            'CDVV36404' // Первичное диагностирование Застрахованному критического заболевания с освобождением от уплаты страховых взносов
        ]);
        const kidIsERCNotInsuredDisabilityOrCriticalDisease = kidIsERCNotInsuredDisability || kidIsERCNotInsuredCriticalDisease;
        const kidIsERCNotInsuredDeathOrDisability = checkAvailabilitySome(kidRiskCodes, ['D36404', 'D36102', 'DNS36404', 'DNS36102', 'DDTP36404']);
        const kidIsERCNotInsuredJobLoss = checkAvailabilitySome(kidRiskCodes, ['JL36404']); // Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты одного взноса
        const kidIsHospitalization = checkAvailabilitySome(kidRiskCodes, ['HC20700']);

        // Bottom running title for first page
        const setKidPrintoutBottomRunningTitleFirstPage = this.getKidBottomRunningTitle(input, 1);

        // Bottom running title for second page
        const setKidPrintoutBottomRunningTitleSecondPageSettings = {};
        const setKidPrintoutBottomRunningTitleSecondPage = this.getKidBottomRunningTitle(input, 2);

        // Bottom running title for third page
        const setKidPrintoutBottomRunningTitleThirdPageSettings = {};
        const setKidPrintoutBottomRunningTitleThirdPage = this.getKidBottomRunningTitle(input, 3);

        const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
        const creditProgramId = input.body.creditProgram.creditProgramId;
        const annuityPaymentSum = input.body.creditContract.annuityPaymentSum;

        const kidIs08 = creditProgramId == 'РЖ08';
        const kidIs12 = creditProgramId == 'РЖ12';
        const kidIs15 = creditProgramId == 'РЖ15';
        const kidIs20 = creditProgramId == 'РЖ20';
        const kidIs24 = creditProgramId == 'РЖ24';
        const kidIs27 = creditProgramId == 'РЖ27';
        const kidIs30 = creditProgramId == 'РЖ30';
        const kidIs33 = creditProgramId == 'РЖ33';
        const kidIs35 = creditProgramId == 'РЖ35';
        const kidIs36 = creditProgramId == 'РЖ36';

        const kidIsCcp = (productCode == 'CCP') || (productCode == 'CCP2') || (productCode == 'CCP3');

        const kidIs08_36_ccp = kidIs08 || kidIs36 || kidIsCcp;

        const kidReducePageNumber = kidIs08_36_ccp ? 3 : 2;


        const kidIsCmp = (productCode == 'CMP') || (productCode == 'CMP3') || (productCode == 'CMP4');
        const riskSJ1 = checkAvailabilitySome(kidRiskCodes, ['DIL42204', 'DNST42204']);
        const riskSJ2 = checkAvailabilitySome(kidRiskCodes, ['CD42204', 'HA42204']);
        const riskTR = checkAvailabilitySome(kidRiskCodes, ['I42204']);

        const kidCreditRateInitial = getValue(input, 'body.creditContract.creditRate', 0) * 100;
        const kidCreditRateRefuseInitial = getValue(input, 'body.creditContract.creditRateRefuse', 0) * 100;
        const kidCreditRate = formatHelper.formatNumberToMoney(kidCreditRateInitial);
        const kidCreditRateRefuse = formatHelper.formatNumberToMoney(kidCreditRateRefuseInitial);
        const kidCreditRateDiff = kidCreditRateInitial && kidCreditRateRefuseInitial && formatHelper.formatNumberToMoney(kidCreditRateRefuseInitial - kidCreditRateInitial);
        const kidHolder = this.getPerson(input.body.policyHolder.partyData);

        const issueDate = input.body.basicConditions.issueDate;
        const isBetween20230301And20230331 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2023-03-01'))
            && DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2023-03-31'));
        const CMP4First = (productCode == 'CMP4') && isBetween20230301And20230331;

        const isBetween20220221And20220630 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-02-21'))
            && DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-06-30'));
        const isBetween20220701And202200914 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-07-01'))
            && DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-09-14'));
        const isBetween20221008And20221023 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-10-08'))
            && DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-10-23'));
        const isBetween20221024And20221218 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-10-24'))
            && DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-12-18'));
        const isBetween20221219And20230331 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-12-19'))
            && DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2023-03-31'));
        const isBetween20230401And20231102 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2023-04-01'))
            && DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2023-11-02'));

        const CCPFirst = (productCode == 'CCP') && isBetween20220221And20220630;
        const CCPSecond = (productCode == 'CCP') && isBetween20220701And202200914;
        const CCPThird = (productCode == 'CCP') && isBetween20221008And20221023;
        const CCP2First = (productCode == 'CCP2') && isBetween20221008And20221023;
        const CCPFourth = (productCode == 'CCP') && isBetween20221024And20221218;
        const CCP3First = (productCode == 'CCP3') && isBetween20221024And20221218;
        const CCP3Second = (productCode == 'CCP3') && isBetween20221219And20230331;
        const CCP3Third = (productCode == 'CCP3') && isBetween20230401And20231102;


        if (CCPFourth || CCP2First || CCPThird) {
            policy.rule = 'Правил страхования жизни физических лиц №9 (в редакции от 01 октября 2022 года)';
        }
        if (CCP3Third) {
            policy.rule = 'Правил страхования жизни физических лиц №9 (в редакции от 01 апреля 2023 года)';
        }

        return {
            kidPolicyBody: body,
            kidProductCode: currentProductCode,
            kidInsurer,
            kidIssueDate,
            kidProductName,
            kidRuleLinkQR,
            kidRuleDescription,
            kidRisk,
            kidInsuranceRisksNames,
            kidInsuranceRisksNamesAdditional,
            kidIsInjury,
            kidIsPaper,
            kidSelectedPackagesNames,
            kidPolicyHolderFullName,
            kidIsERCNotInsuredDeathOrDisability,
            kidIsERCNotInsuredDisability,
            kidIsERCNotInsuredCriticalDisease,
            kidIsERCNotInsuredDisabilityOrCriticalDisease,
            kidIsERCNotInsuredJobLoss,
            kidIsHospitalization,
            kidReducePageNumber,
            setKidPrintoutBottomRunningTitleFirstPage,
            setKidPrintoutBottomRunningTitleSecondPage,
            setKidPrintoutBottomRunningTitleThirdPage,
            kidCreditRate,
            kidCreditRateRefuse,
            kidCreditRateDiff,
            kidIs08,
            kidIs12,
            kidIs15,
            kidIs20,
            kidIs24,
            kidIs27,
            kidIs30,
            kidIs33,
            kidIs35,
            kidIs36,
            kidIs08_36_ccp,
            kidHolder,
            kidIsCmp,
            riskSJ1,
            riskSJ2,
            riskTR,
            CMP4First,
        };
    },

    activateKidPrintout(input, output, that, kidIsMulti, activateKIDdate = printoutsConstant.activateKIDdate.DEFAULT) {

        const issueDate = input.body.basicConditions?.issueDate;
        const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
        const isPaper = input.body.issueForm?.code?.issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode;
        const isKidPrintout = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate(activateKIDdate));
        const isIDGReinvest = lifeInsuranceConstants.productGroupArray.IDG_REINVEST.includes(productCode);

        output.setPolicyPrintoutRunningTitleIfKidExist = this.setPolicyPrintoutRunningTitleIfKidExist(isKidPrintout);

        if ((isPaper || isIDGReinvest) && isKidPrintout) {
            const kidMapping = this.setKidPrintoutMapping(input, that, kidIsMulti);
            output.isKidPrintout = isKidPrintout;
            output.reducePrintoutPagesTotalNumber = this.reducePrintoutPagesTotalNumber(kidMapping.kidReducePageNumber);
            output.setKidPrintoutTopRunningTitle = this.setKidPrintoutTopRunningTitle();
            Object.assign(output, kidMapping);
        }
    },

    activateKidCreditPrintoutForPaper(input, output, that, activateKIDdate = printoutsConstant.activateKIDdate.DEFAULT) {
        const issueDate = input.body.basicConditions?.issueDate;
        const isPaper = input.body.issueForm?.code?.issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode;
        const isKidPrintout = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate(activateKIDdate));
        output.setPolicyPrintoutRunningTitleIfKidExist = this.setPolicyPrintoutRunningTitleIfKidExist(isKidPrintout);
        if (isPaper && isKidPrintout) {
            const kidMapping = this.setKidCreditPrintoutMapping(input, that);
            output.isKidPrintout = isKidPrintout;
            output.reducePrintoutPagesTotalNumber = this.reducePrintoutPagesTotalNumber(kidMapping.kidReducePageNumber);
            output.setKidPrintoutTopRunningTitle = this.setKidPrintoutTopRunningTitle();
            Object.assign(output, kidMapping);
        }
    },

    riskProductRelationsMapping(input) {

        if (!input.kidProductCode) {
            return null;
        }

        const output = {
            data: {
                criteria: {
                    productCode: input.kidProductCode,
                    kidIsMulti: input.kidIsMulti
                }
            }
        };

        return output;
    },

    riskProductRelationsApply(input, dataSourceResponse) {

        if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

            const allRelations = dataSourceResponse.data.map(item => item.resultData);
            const isRiskCU10800Group = productGroupArray.RISK_CU10800.includes(input.kidProductCode);

            allRelations.forEach(function (elem) {
                if (elem.riskCode == 'ME36404') {
                    elem.riskFullDescription = 'Дожитие Застрахованного до дат, установленных в Договоре страхования';
                }
                if (elem.riskCode == 'CD636404') {
                    elem.riskFullDescription = 'Первичное диагностирование Застрахованному критического заболевания с освобождением от уплаты страховых взносов';
                }
                if (elem.riskCode == 'JL36404') {
                    elem.riskFullDescription = 'Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты одного страхового взноса';
                }
                if (elem.riskCode == 'DLPVV36404' || elem.riskCode == 'DLPVV46204') {
                    elem.riskFullDescription = 'Смерть Застрахованного по любой причине';
                }
                if (elem.riskCode == 'TCU10800') {
                    elem.riskFullDescription = 'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой, в связи с необходимостью проведения профилактических мероприятий, снижающих степень опасных для жизни или здоровья Застрахованного угроз и/или устраняющих их';
                }
                if (isRiskCU10800Group && elem.riskCode == 'CU10800') {
                    elem.riskFullDescription = 'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Медицинские обследования», в связи с необходимостью проведения профилактических мероприятий, снижающих степень опасных для жизни или здоровья Застрахованного угроз и/или устраняющих их';
                }
            });

            // Застрахованный - Застрахованный 1 (Ребенок)
            let mainIPRiskFullDescriptions = emptyValue;
            const mainIPRiskCodes = input.kidRisk.mainIP?.map(item => item.riskCode);
            const mainIPRiskCodesData = allRelations.filter(item => mainIPRiskCodes.includes(item.riskCode));
            if (mainIPRiskCodesData && mainIPRiskCodesData.length > 0) {
                const mainIPRiskFullDescriptionArr = mainIPRiskCodesData.map(item => item.riskFullDescription);
                mainIPRiskFullDescriptions = mainIPRiskFullDescriptionArr.join('; ');
            }

            // Страхователь - Застрахованный 2 (Взрослый)
            let mainPHRiskFullDescriptions = emptyValue;
            const mainPHRiskCodes = input.kidRisk.mainPH?.map(item => item.riskCode);
            const mainPHRiskCodesData = allRelations.filter(item => mainPHRiskCodes.includes(item.riskCode));
            if (mainPHRiskCodesData && mainPHRiskCodesData.length > 0) {
                const mainPHRiskFullDescriptionArr = mainPHRiskCodesData.map(item => item.riskFullDescription);
                mainPHRiskFullDescriptions = mainPHRiskFullDescriptionArr.join('; ');
            }

            input.kidAllProductRiskRelations = allRelations;
            input.kidMainIPRiskFullDescriptions = mainIPRiskFullDescriptions;
            input.kidMainPHRiskFullDescriptions = mainPHRiskFullDescriptions;
        }

        const riskProductRelations = {
            kidAllProductRiskRelations: input.kidAllProductRiskRelations,
            kidMainIPRiskFullDescriptions: input.kidMainIPRiskFullDescriptions,
            kidMainPHRiskFullDescriptions: input.kidMainPHRiskFullDescriptions
        };

    },

    showKIDPrintout(input, that) {

        // Don't remove, needed to send email ->
        const actor = that.applicationContext.actor;
        const isSystemActor = actor == lifeInsuranceConstants.actor.System;
        if (isSystemActor) {
            return true;
        }
        // <- Don't remove, needed to send email

        const body = input.body;
        const isOperations = that.applicationContext.actor == lifeInsuranceConstants.actor.Operations;
        const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
        const issueDate = getValue(body, 'basicConditions.issueDate');
        const isPaper = getValue(body, 'issueForm.code.issueFormCode') == lifeInsuranceConstants.issueForm.paper.issueFormCode;
        const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
        const ePolicytConf = ePolicytConfiguration({ productCode, issueDate }).result ?? {};
        const isVtbKidGroup = lifeInsuranceConstants.productGroupArray.KID_VTB.includes(productCode);
        const skipKidOnQuote = lifeInsuranceConstants.productGroupArray.SKIP_KID_QUOTE.includes(productCode);

        if (skipKidOnQuote) { return; }

        if (isSystemActor || (isPaper && isVtbKidGroup && isOperations) || (ePolicytConf && ePolicytConf.kidPrintout && ePolicytConf.showKIDoperations && isOperations && !isPaper)) {
            return true;
        }

        return;
    },

    showServiceMemoPrintout(input, that, serviceMemoCodes) {

        // Don't remove, needed to send email ->
        const actor = that.applicationContext.actor;
        const isSystemActor = actor == lifeInsuranceConstants.actor.System;
        if (isSystemActor) {
            return true;
        }
        // <- Don't remove, needed to send email

        const body = input.body;
        const productCode = input.body?.mainInsuranceConditions?.insuranceProduct?.productCode;
        const isAgent = that.applicationContext.actor == lifeInsuranceConstants.actor.Agent;
        const isOperations = that.applicationContext.actor == lifeInsuranceConstants.actor.Operations;
        const isEPolicy = getValue(body, 'issueForm.code.issueFormCode') == lifeInsuranceConstants.issueForm.ePolicy.issueFormCode;

        if ((isAgent || isOperations) && isEPolicy) {

            const additionalServices = input.body.additionalServices;
            const serviceCodes = additionalServices.map(item => item.serviceCode);

            if (checkAvailabilitySome(serviceCodes, serviceMemoCodes)) {
                return true;
            }
        }

        return;
    },

    showByProductMemoPrintout(input, that, products) {

        // Don't remove, needed to send email ->
        const actor = that.applicationContext.actor;
        const isSystemActor = actor == lifeInsuranceConstants.actor.System;
        if (isSystemActor) {
            return true;
        }
        // <- Don't remove, needed to send email

        const body = input.body;
        const isAgent = that.applicationContext.actor == lifeInsuranceConstants.actor.Agent;
        const isOperations = that.applicationContext.actor == lifeInsuranceConstants.actor.Operations;
        const isEPolicy = getValue(body, 'issueForm.code.issueFormCode') == lifeInsuranceConstants.issueForm.ePolicy.issueFormCode;
        const currentProductCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
        const isRightProduct = products.includes(currentProductCode);

        if ((isAgent || isOperations) && isEPolicy && isRightProduct) {

            return true;
        }

        return;
    },

    setKidEPrintoutMapping(input, output, activateKIDdate = printoutsConstant.activateKIDdate.DEFAULT) {
        const basicConditions = input.body.basicConditions;
        const issueDate = basicConditions?.issueDate;
        output.isKidPrintout = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate(activateKIDdate));
    },

    getHolderInfoForApplicationInsurance(input) {

        const body = input.body;
        const regAddress = body.policyHolder.partyData.partyBody?.partyAddresses
            .filter(p => p.addressType?.addressTypeCode == 'R')[0] ?? {};
        const factAddress = body.policyHolder.partyData.partyBody?.partyAddresses
            .filter(p => p.addressType?.addressTypeCode == 'F')[0] ?? {};
        const clrStreet = / улица|ул. |ул /gi;

        return {
            fullName: body.policyHolder.partyData.partyFullName,
            innkio: body.policyHolder.partyData.partyBody.partyGeneralData?.INNKIO,
            snils: body.policyHolder.partyData.partyBody.partyGeneralData?.SNILS,
            citizenship: body.policyHolder.partyData.partyBody.partyPersonData?.citizenship ? body.policyHolder.partyData.partyBody.partyPersonData?.citizenship[0]?.countryShortName : emptyValue,
            lastName: body.policyHolder.partyData.partyBody.partyPersonData?.lastName,
            gender: body.policyHolder.partyData.partyBody.partyPersonData?.personGender,
            dateOfBirth: body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth,
            birthPlace: body.policyHolder.partyData.partyBody.partyPersonData?.birthPlace,
            docType: body.policyHolder.partyData.partyBody?.partyDocuments[0]?.docType?.docTypeDesc,
            docSeries: body.policyHolder.partyData.partyBody?.partyDocuments[0]?.docSeries,
            docNumber: body.policyHolder.partyData.partyBody?.partyDocuments[0]?.docNumber,
            issuerName: body.policyHolder.partyData.partyBody?.partyDocuments[0]?.issuerName,
            issuerCode: body.policyHolder.partyData.partyBody?.partyDocuments[0]?.issuerCode,
            issueDocDate: body.policyHolder.partyData.partyBody.partyDocuments[0]?.issueDate,
            addressRegistration: regAddress,
            streetAddressReg: regAddress.fullAddress?.data?.street_with_type ? regAddress.fullAddress.data.street_with_type.replaceAll(clrStreet, emptyValue) : emptyValue,
            addressFactial: factAddress,
            streetAddressFact: factAddress.fullAddress?.data?.street_with_type ? factAddress.fullAddress.data.street_with_type.replaceAll(clrStreet, emptyValue) : emptyValue,
            partyPhone: body.policyHolder.partyData.partyBody?.partyPhones[0]?.fullNumberFormatted,
            partyEmails: body.policyHolder.partyData.partyBody?.partyEmails[0]?.email,
            bankAccountNumber: body.policyHolder.partyData.partyBody?.partyBankAccounts?.[0]?.number,
            bankName: body.policyHolder.partyData.partyBody?.partyBankAccounts?.[0]?.bankName,
            bankCorrespondentAccount: body.policyHolder.partyData.partyBody?.partyBankAccounts?.[0]?.bankCorrespondentAccount,
            bankBik: body.policyHolder.partyData.partyBody?.partyBankAccounts?.[0]?.bankBic,
            bankInn: body.policyHolder.partyData.partyBody?.partyBankAccounts?.[0]?.bankInn,
        };
    },

    getInsuredInfoForApplicationInsurance(input) {

        const body = input.body;
        const regAddress = body.insuredPerson.partyData.partyBody?.partyAddresses
            .filter(p => p.addressType?.addressTypeCode == 'R')[0] ?? {};
        const factAddress = body.insuredPerson.partyData.partyBody?.partyAddresses
            .filter(p => p.addressType?.addressTypeCode == 'F')[0] ?? {};
        const clrStreet = / улица|ул. |ул /gi;

        return {
            fullName: body.insuredPerson.partyData?.partyFullName,
            innkio: body.insuredPerson.partyData.partyBody.partyGeneralData?.INNKIO,
            snils: body.insuredPerson.partyData.partyBody.partyGeneralData?.SNILS,
            citizenship: body.insuredPerson.partyData.partyBody.partyPersonData?.citizenship ? body.insuredPerson.partyData.partyBody.partyPersonData?.citizenship[0]?.countryShortName : emptyValue,
            lastName: body.insuredPerson.partyData.partyBody.partyPersonData?.lastName,
            gender: body.insuredPerson.partyData.partyBody.partyPersonData?.personGender,
            dateOfBirth: body.insuredPerson.partyData.partyBody.partyPersonData?.dateOfBirth,
            birthPlace: body.insuredPerson.partyData.partyBody.partyPersonData?.birthPlace,
            docType: body.insuredPerson.partyData.partyBody?.partyDocuments[0]?.docType?.docTypeDesc,
            docSeries: body.insuredPerson.partyData.partyBody?.partyDocuments[0]?.docSeries,
            docNumber: body.insuredPerson.partyData.partyBody?.partyDocuments[0]?.docNumber,
            issuerName: body.insuredPerson.partyData.partyBody?.partyDocuments[0]?.issuerName,
            issuerCode: body.insuredPerson.partyData.partyBody?.partyDocuments[0]?.issuerCode,
            issueDocDate: body.insuredPerson.partyData.partyBody?.partyDocuments[0]?.issueDate,
            addressRegistration: regAddress,
            streetAddressReg: regAddress.fullAddress.data?.street_with_type ? regAddress.fullAddress.data.street_with_type.replaceAll(clrStreet, emptyValue) : emptyValue,
            addressFactial: factAddress,
            streetAddressFact: factAddress.fullAddress.data?.street_with_type ? factAddress.fullAddress.data.street_with_type.replaceAll(clrStreet, emptyValue) : emptyValue,
            partyPhone: body.insuredPerson.partyData.partyBody?.partyPhones[0]?.fullNumberFormatted,
            partyEmails: body.insuredPerson.partyData.partyBody?.partyEmails[0]?.email,
            bankAccountNumber: body.insuredPerson.partyData.partyBody?.partyBankAccounts?.[0]?.number,
            bankName: body.insuredPerson.partyData.partyBody?.partyBankAccounts?.[0]?.bankName,
            bankCorrespondentAccount: body.insuredPerson.partyData.partyBody?.partyBankAccounts?.[0]?.bankCorrespondentAccount,
            bankBik: body.insuredPerson.partyData.partyBody?.partyBankAccounts?.[0]?.bankBic,
            bankInn: body.insuredPerson.partyData.partyBody?.partyBankAccounts?.[0]?.bankInn,
        };
    },

    getFutureContractNumber(input) {
        return input.body?.technicalInformation?.futureContractNumber;
    },

    getInvoiceForPaymentMapping(input, that) {
        const holder = this.getPerson(input.body.policyHolder.partyData);
        const { policy } = this.getPollicyInfo(input, that);
        const paymentPlan = this.getPaymentPlan(input.body.paymentPlan);
        return {
            holderFullName: holder.fullName,
            holderRegistrationAddress: holder.registrationAddress,
            policyNumber: policy.number,
            policyIssueDate: policy.issueDate,
            paymentPlanInsurancePremium: paymentPlan[0].insurancePremium
        };
    },

    isAllDeclarationMainConfirmed(declarationMain) {
        return declarationMain?.every(item => item.agreementPolicyHolder == true)
            && declarationMain?.every(item => item.agreementInsuredPerson == true);
    },

    isAllDeclarationMedicalConfirmed(declarationMedical) {
        return declarationMedical?.every(item => item.agreement == true);
    },

    isSkipAttachmentsValidationAPI(that, partnerCode, isKid, productCode) {

        const product = lifeInsuranceConstants.product;
        const hideKid = [product.IBG3BFKO2, product.IBI3BFKO17, product.IBI5BFKO17, product.IBI3BFKO17, product.IBI5BFKO17, product.EBMIBFKO, product.IBA3BFKO, product.IBA5BFKO, product.IBI3BFKO, product.IBI5BFKO, product.NOTE3BFKO, product.NOTE1BFKO, product.NOTE1BFKO3, product.NOTE1BFKO4];

        if (isKid && hideKid.includes(productCode)) {
            return;
        }

        return that.applicationContext.originatingUser.applicationRoles.some(x => x == "SkipAttachmentsValidationAPI")
            && partnerCode == lifeInsuranceConstants.partnerCode.BFKO;
    },

    getLetterTable(inputString) {

        const letterTable = inputString ? inputString.split('') : [];
        const letterTableLength = letterTable.length;

        return {
            letterTable,
            letterTableLength
        };
    },

    pushLetterTable(inputString, outputCount, inElement = '') {

        const tableData = this.getLetterTable(inputString);

        for (let i = 0; i < (outputCount - tableData.letterTableLength); i++) {
            tableData.letterTable.push(inElement);
        }

        return tableData.letterTable;
    },

    unshiftLetterTable(inputString, outputCount, inElement = '') {

        const tableData = this.getLetterTable(inputString);

        for (let i = 0; i < (outputCount - tableData.letterTableLength); i++) {
            tableData.letterTable.unshift(inElement);
        }

        return tableData.letterTable;
    },

    getDecimalValue(amount) {

        return Number.isInteger(amount) || amount === undefined ? "00" : round(amount, 2).toString().split('.')[1];
    },

    termLifeInsurancePaymentFilter(termRisks, totalPremiumSum) {

        let result = termRisks.mainRisks.map(m => {
            return {
                sum: 0,
                riskDesc: m.riskShortDescription,
                riskCode: m.riskCode,
                premium: parseFloat(m.insurancePremium.replace(' ', '').replace(',', '.')),
                startDate: DateTimeUtils.parseLocalDateToISO(m.startDate),
                endDate: DateTimeUtils.parseLocalDateToISO(m.endDate)
            };
        });

        if (termRisks.isPackage2) {
            result = result.concat(termRisks.package2.map(m => {
                return {
                    sum: 0,
                    riskDesc: m.riskShortDescription,
                    riskCode: m.riskCode,
                    premium: parseFloat(m.insurancePremium.replace(' ', '').replace(',', '.')),
                    startDate: DateTimeUtils.parseLocalDateToISO(m.startDate),
                    endDate: DateTimeUtils.parseLocalDateToISO(m.endDate)
                };
            }));
        }

        if (termRisks.isPackage3) {
            result = result.concat(termRisks.package3.map(m => {
                return {
                    sum: 0,
                    riskDesc: m.riskShortDescription,
                    riskCode: m.riskCode,
                    premium: parseFloat(m.insurancePremium.replace(' ', '').replace(',', '.')),
                    startDate: DateTimeUtils.parseLocalDateToISO(m.startDate),
                    endDate: DateTimeUtils.parseLocalDateToISO(m.endDate)
                };
            }));
        }

        if (!result.length || result.length == 0) { return []; }

        if (result.length == 1) {
            return [{
                sum: parseFloat(totalPremiumSum.replace(' ', '').replace(',', '.')),
                premium: result[0].premium,
                startDate: DateTimeUtils.formatDate(result[0].startDate, DateTimeUtils.DateFormats.CALENDAR),
                endDate: DateTimeUtils.formatDate(result[0].endDate, DateTimeUtils.DateFormats.CALENDAR),
            }];
        }

        const isUniqueDate = (element, index, array) => (array.findIndex((el) => el.endDate === element.endDate) === index);
        const uniqeDates = result.filter(isUniqueDate).map((el) => { return { date: el.endDate }; });

        const tmpRes = [];
        for (let i = 0; i < uniqeDates.length; i++) {

            const eqDateItems = result.filter((item) => item.endDate === uniqeDates[i].date);
            tmpRes.push(
                {
                    premium: eqDateItems.reduce((a, b) => a + b.premium, 0),
                    startDate: new Date(eqDateItems[0].startDate),
                    endDate: new Date(eqDateItems[0].endDate)
                }
            );
        }
        result = tmpRes;

        result.sort((a, b) => (a.endDate) - (b.endDate));

        for (let i = 0; i < result.length - 1; i++) {
            result[i + 1].startDate = DateTimeUtils.addDays(result[i].endDate, 1);
        }

        for (let i = 0; i < result.length; i++) {

            if (i == 0) {
                result[i].sum = parseFloat(totalPremiumSum.replace(' ', '').replace(',', '.'));
                continue;
            }

            result[i].sum = result[i - 1].sum - result[i - 1].premium;

        }

        for (let i = 0; i < result.length; i++) {
            result[i].startDate = DateTimeUtils.formatDate(result[i].startDate, DateTimeUtils.DateFormats.CALENDAR);
            result[i].endDate = DateTimeUtils.formatDate(result[i].endDate, DateTimeUtils.DateFormats.CALENDAR);
        }

        return result;

    },

    getTemplateForInsurancePaymentTable(premiumRisks) {

        let res = '';
        const length = premiumRisks.length;

        for (let i = 0; i < length; i++) {

            if (i == 0) {
                res = res +
                    '<tr>' +
                    '<td class="tgrey" colspan="1" rowspan="' + length + '">Размер последующих страховых взносов составляет:</td>' +
                    '<td colspan="4">' + this.formatMoneyPrint(premiumRisks[i].sum) + ' рублей</td>' +
                    '<td>с ' + premiumRisks[i].startDate + '</td>' +
                    '<td>по ' + premiumRisks[i].endDate + '</td>' +
                    '</tr>';
                continue;
            }

            res = res +
                '<tr>' +
                '<td colspan="4">' + this.formatMoneyPrint(premiumRisks[i].sum) + ' рублей</td>' +
                '<td>с ' + premiumRisks[i].startDate + '</td>' +
                '<td>по ' + premiumRisks[i].endDate + '</td>' +
                '</tr>';

        }

        return res;
    },

    pushElementByRiskCode(riskMandatoryBuff, riskMandatory, riskCode) {
        const index = riskMandatory.findIndex(item => item.riskCode == riskCode);
        if (index > -1) {
            riskMandatoryBuff.push(riskMandatory[index]);
        }
    },

    getCreditRating(issueDate, productCode) {

        const defaultResult = printoutsConstant.insurerInfo.rating;

        if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_CREDIT_RATING.includes(productCode) || lifeInsuranceConstants.productGroupArray.EQUITY_CREDIT_RATING.includes(productCode)) {

            if (DateTimeUtils.isAfterOrEqual(issueDate, printoutsConstant.insurerInfo.rating_basis_active_v4.fromDate) && productCode !== lifeInsuranceConstants.product.PREEQUITYPVTB) {
                return printoutsConstant.insurerInfo.rating_basis_active_v4.text;
            }

            if (DateTimeUtils.isAfterOrEqual(issueDate, printoutsConstant.insurerInfo.rating_basis_active_v3.fromDate)) {
                return printoutsConstant.insurerInfo.rating_basis_active_v3.text;
            }

            if (DateTimeUtils.isAfterOrEqual(issueDate, printoutsConstant.insurerInfo.rating_basis_active_v2.fromDate)) {
                return printoutsConstant.insurerInfo.rating_basis_active_v2.text;
            }

            return defaultResult;
        }

        return defaultResult;
    },
    unpayedPremiumCondition(issueDate, productCode) {
        const psb_product = lifeInsuranceConstants.productGroupArray.PSB_TEXT_AFTER_2024_12_15.includes(productCode);
        if (psb_product && DateTimeUtils.isAfter(issueDate, '2024-12-15')) {
            return true;
        }
        const oas_product = lifeInsuranceConstants.productGroupArray.OAS_TEXT_AFTER_2024_12_31.includes(productCode);
        if (oas_product && DateTimeUtils.isAfter(issueDate, '2024-12-31')) {
            return true;
        }
        const reinvest_lifeInvest = lifeInsuranceConstants.productGroupArray.REINVEST_LIFEINVEST_TEXT_AFTER_2024_12_31.includes(productCode);
        if (reinvest_lifeInvest && DateTimeUtils.isAfter(issueDate, '2024-12-31')) {
            return true;
        }
        const vtb_product = lifeInsuranceConstants.productGroupArray.VTB_TEXT_AFTER_2025_02_21.includes(productCode);
        if (vtb_product && DateTimeUtils.isAfter(issueDate, '2025-02-20') || ['ECOF2ZENIT'].includes(productCode)) {
            return true;
        }
        const market_banks = lifeInsuranceConstants.productGroupArray.TEXTS_FOR_MARKET_BANKS_SINCE_2025_03_07.includes(productCode);
        if (market_banks && DateTimeUtils.isAfter(issueDate, '2025-03-06')) {
            return true;
        }
        const ekspo_bank = lifeInsuranceConstants.productGroupArray.IDG_EKSPO_BANK.includes(productCode);
        if (ekspo_bank && DateTimeUtils.isAfter(issueDate, '2025-06-09')) {
            return true;
        }

        if (['EBM3GUBRR'].includes(productCode)) {
            return true;
        }

        return false;
    },
    checkTaxDeductionConditions(issueDate, productCode) {
        const isTaxDeductionSince28022025 = lifeInsuranceConstants.productGroupArray.TAX_DEDUCTION_SINCE_28_02_2025.includes(productCode);
        const isFIN5PSBNew = lifeInsuranceConstants.productGroupArray.FIN5_PSB_SINCE_2025_02_15.includes(productCode);

        if (isTaxDeductionSince28022025 && DateTimeUtils.isAfter(issueDate, '2025-02-27')) {
            return true;
        }

        if (isFIN5PSBNew && DateTimeUtils.isAfter(issueDate, '2025-02-14')) {
            return true;
        }

        return false;
    },

    getSportTypes(input) {
        const selectedTypes = input?.basicConditions?.sportTypes?.selectedTypes;

        const namesString = selectedTypes.map(type => type.name.toLowerCase()).join(', ');

        return namesString;

    }
};
