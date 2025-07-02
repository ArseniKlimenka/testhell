'use strict';

const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

/**
 * @errorCode {errorCode} paymentFrequencyIsRequired
 * @errorCode {errorCode} currencyIsRequired
 * @errorCode {errorCode} exchangeRateIsRequired
 * @errorCode {errorCode} insuranceTermsIsRequired
 * @errorCode {errorCode} issueDateIsRequired
 * @errorCode {errorCode} applicationDateLessThanIssueDate
 * @errorCode {errorCode} originalReceiptDateLessThanIssueDate
 * @errorCode {errorCode} receiptDateLessThancurrentDate
 * @errorCode {errorCode} acceptToWorkDateLessThancurrentDate
 * @errorCode {errorCode} daysBetweenCurrentDateIssueDate
 * @errorCode {errorCode} applicationDateIsRequired
 * @errorCode {errorCode} receiptDateIsRequired
 * @errorCode {errorCode} acceptToWorkDateIsRequired
 * @errorCode {errorCode} riskPremiumIsRequired
 * @errorCode {errorCode} riskInsuredSumMin
 * @errorCode {errorCode} riskInsuredSumMinForInsuredAge
 * @errorCode {errorCode} riskInsuredSumMax
 * @errorCode {errorCode} riskInsuredSumIsRequired
 * @errorCode {errorCode} riskPremiumMin
 * @errorCode {errorCode} riskPremiumMax
 * @errorCode {errorCode} endowmentInsuredSum
 * @errorCode {errorCode} DLPSS36404InsuredSum
 * @errorCode {errorCode} hasNotRiskStartDateEqualsContractStartDate
 * @errorCode {errorCode} riskStartDateLessContractStartDate
 * @errorCode {errorCode} hasNotRiskStartDateEqualsAmendmentEffectiveDate
 * @errorCode {errorCode} reinvestContractNumberIsRequired
 * @errorCode {errorCode} reinvestIssueDateIsRequired
 * @errorCode {errorCode} calcFromInconsistency
 * @errorCode {errorCode} riskPremiumMustBeRoundedOn1000
 * @errorCode {errorCode} NoteAboutSigned
 * @errorCode {errorCode} NotePassportAndSigned
 * @errorCode {errorCode} scanReadbleQuality
 * @errorCode {errorCode} productReleaseIsPossibleOnlyWithcomplexSales
 * @errorCode {errorCode} DLPSS36404InsuredSumEcofZenit
 */

module.exports = function validationBasicConditions(input) {

    const validationErrors = [];

    if (this.businessContext.configurationCodeName === 'CancellationInquiry') {
        return validationErrors;
    }

    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const contractType = this.businessContext.configurationDimensions.contractType;
    const productGroup = this.businessContext.configurationDimensions.productGroup;
    const documentState = this.businessContext.documentState;
    const isCollectivePolicy = this.businessContext.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    const paymentFrequencyCode = input?.paymentFrequency?.paymentFrequencyCode;
    const currencyCode = input?.currency?.currencyCode;
    const isFixedRate = input?.isFixedRate ?? false;
    const exchangeRate = input?.exchangeRate;
    const insuranceTerms = input?.insuranceTerms;
    const insuranceTermsMonths = input?.insuranceTermsMonths;
    const insuranceTermsDays = input?.insuranceTermsDays?.value;
    const riskPremium = input?.riskPremium;
    const riskInsuredSum = input?.riskInsuredSum;
    const calcFromInsuredSum = input?.calcFromInsuredSum ?? false;
    const issueDate = input?.issueDate;
    const applicationDate = input?.applicationDate;
    const receiptDate = input?.receiptDate;
    const originalReceiptDate = input?.originalReceiptDate;
    const acceptToWorkDate = input?.acceptToWorkDate;
    const isCreatedByOperations = body?.technicalInformation?.isCreatedByOperations;
    const currentDate = DateTimeUtils.dateNow();
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const risks = body?.risks ?? [];
    const endowmentRisk = risks.find(r => ['E36102', 'E36404'].includes(r.risk.riskCode));
    const endowmentInsuredSum = endowmentRisk && endowmentRisk.riskInsuredSum;
    const insuredBirthDate = body?.insuredPerson?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const contractStartDate = body?.basicConditions?.issueDate;
    const insuredAgeOnStartDate = DateTimeUtils.getYearDifference(insuredBirthDate, contractStartDate);
    const reinvestContractNumber = body?.basicConditions?.reinvestContractNumber;
    const reinvestIssueDate = body?.basicConditions?.reinvestIssueDate;
    const isReinvestCheckbox = body?.basicConditions?.isReinvest;
    const isSpecialOfferCheckbox = body?.basicConditions?.isSpecialOffer;
    const issueForm = body?.issueForm?.code?.issueFormCode;
    const policyTerms = body?.policyTerms;
    const maxPremiumZenit = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode) || lifeInsuranceConstants.product.EBMGZENIT.includes(productCode)
        && issueForm == lifeInsuranceConstants.issueForm.ePolicy.issueFormCode;
    const skipMaxPremValid = lifeInsuranceConstants.productGroupArray.SKIP_PREMIUM_MAX_VALID_FOR_PAPER.includes(productCode) && issueForm == lifeInsuranceConstants.issueForm.paper.issueFormCode;

    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const minPremium = productCode && issueDate && currencyCode && paymentFrequencyCode
        && productConf?.minPremium && productConf?.minPremium[currencyCode] && productConf?.minPremium[currencyCode][paymentFrequencyCode] || 0;

    const maxInsuredSumMainRisk = productCode && issueDate && productConf?.maxInsuredSumMainRiskMandatoryAgreement || productConf?.maxInsuredSumMainRisk;

    let maxPremiumConfig = productCode && issueDate && currencyCode &&
        ((productConf?.maxPremiumMandatoryAgreement && productConf?.maxPremiumMandatoryAgreement[currencyCode]) ||
            (productConf?.maxPremium && productConf?.maxPremium[currencyCode]));
    maxPremiumConfig = maxPremiumZenit ? (productConf?.maxPremium && productConf?.maxPremium[currencyCode]) : maxPremiumConfig;
    const maxPremiumConfigAge = maxPremiumConfig && Object.keys(maxPremiumConfig)
        .find((item, idx, arr) => insuredAgeOnStartDate >= item && (insuredAgeOnStartDate < arr[idx + 1] || !arr[idx + 1]));
    const maxPremium = maxPremiumConfigAge && maxPremiumConfig[maxPremiumConfigAge];

    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const isWholeLife = productConf?.isWholeLife;
    const risksPremiumSum = risks.reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0);
    const riskPremiumForMinMaxVlidation = calcFromInsuredSum ? risksPremiumSum : riskPremium;
    const applicationRoles = this?.applicationContext?.user?.applicationRoles;
    const isSpecificSales = applicationRoles && applicationRoles.some(t => t == 'SpecificSales');
    const startDate = body?.policyTerms?.startDate;
    const withTarification = input?.withTarification ?? false;
    const isReinvestProduct = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);
    const minRiskInsuredSum = currencyCode && productConf?.minRiskInsuredSum && productConf?.minRiskInsuredSum[currencyCode];
    const minRiskInsuredSumForInsuredAgeWCEN3OAS = 100000;
    const minAgeForMinInsuredSumWCEN3OAS = 40;
    const maxAgeForMinInsuredSumWCEN3OAS = 49;

    const maxInsuredSumConfig = productCode && issueDate && currencyCode &&
        ((productConf?.maxRiskInsuredSum && productConf?.maxRiskInsuredSum[currencyCode]));
    const maxInsuredSumConfigAge = maxInsuredSumConfig && Object.keys(maxInsuredSumConfig)
        .find((item, idx, arr) =>
            insuredAgeOnStartDate >= item &&
            (insuredAgeOnStartDate < arr[idx + 1] || !arr[idx + 1]));
    const maxInsuredSum = maxInsuredSumConfigAge && maxInsuredSumConfig[maxInsuredSumConfigAge];
    const showNoteAboutSigned = lifeInsuranceConstants.productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode) && issueForm == lifeInsuranceConstants.issueForm.ePolicy.issueFormCode;

    if ([product.TERMVVTB].includes(productCode) && riskInsuredSum < minRiskInsuredSum) {
        validationErrors.push({
            errorCode: "riskInsuredSumMin",
            errorDataPath: dataPath + '/riskInsuredSum',
            reference: {
                sum: formatUtils.formatNumberToMoney(minRiskInsuredSum),
            }
        });
    }

    if ([product.WCEN3OAS].includes(productCode) && insuredAgeOnStartDate <= maxAgeForMinInsuredSumWCEN3OAS && riskInsuredSum < minRiskInsuredSumForInsuredAgeWCEN3OAS) {
        validationErrors.push({
            errorCode: "riskInsuredSumMinForInsuredAge",
            errorDataPath: dataPath + '/riskInsuredSum',
            reference: {
                sum: formatUtils.formatNumberToMoney(minRiskInsuredSumForInsuredAgeWCEN3OAS),
                minAge: minAgeForMinInsuredSumWCEN3OAS,
                maxAge: maxAgeForMinInsuredSumWCEN3OAS
            }
        });
    }

    if (showNoteAboutSigned && contractType == lifeInsuranceConstants.contractType.Policy) {
        validationErrors.push(
            {
                errorCode: 'NoteAboutSigned',
                severity: 'Note'
            },
            {
                errorCode: 'NotePassportAndSigned',
                severity: 'Note'
            },
            {
                errorCode: 'scanReadbleQuality',
                severity: 'Note'
            });
    }
    if (isReinvestProduct && isReinvestCheckbox && !reinvestContractNumber) {
        validationErrors.push({
            errorCode: "reinvestContractNumberIsRequired",
            errorDataPath: dataPath + '/reinvestContractNumber'
        });
    }

    if (isReinvestProduct && isReinvestCheckbox && !reinvestIssueDate) {
        validationErrors.push({
            errorCode: "reinvestIssueDateIsRequired",
            errorDataPath: dataPath + '/reinvestIssueDate'
        });
    }

    if (!paymentFrequencyCode) {
        validationErrors.push({
            errorCode: "paymentFrequencyIsRequired",
            errorDataPath: dataPath + '/paymentFrequency'
        });
    }

    if (!currencyCode) {
        validationErrors.push({
            errorCode: "currencyIsRequired",
            errorDataPath: dataPath + '/currency'
        });
    }

    if (!insuranceTerms && productConf.insuranceTerms?.length > 0 && !skipMigrated && !isWholeLife && (!isCollectivePolicy || (isCollectivePolicy && withTarification))) {
        validationErrors.push({
            errorCode: "insuranceTermsIsRequired",
            errorDataPath: dataPath + '/insuranceTerms'
        });
    }

    if (!insuranceTermsMonths && productConf?.insuranceTermsMonths?.length > 0 && contractType == lifeInsuranceConstants.contractType.Quote && !skipMigrated && (!isCollectivePolicy || (isCollectivePolicy && withTarification))) {
        validationErrors.push({
            errorCode: "insuranceTermsIsRequired",
            errorDataPath: dataPath + '/insuranceTermsMonths'
        });
    }

    if (!insuranceTermsDays && productConf?.insuranceTermsDays?.length > 0 && contractType == lifeInsuranceConstants.contractType.Quote && !skipMigrated && (!isCollectivePolicy || (isCollectivePolicy && withTarification))) {
        validationErrors.push({
            errorCode: "insuranceTermsIsRequired",
            errorDataPath: dataPath + '/insuranceTermsDays'
        });
    }

    if ([product.NOTE1BFKO4].includes(productCode) && !calcFromInsuredSum && riskPremium && (riskPremium % 1000 > 0)) {
        validationErrors.push({
            errorCode: "riskPremiumMustBeRoundedOn1000",
            errorDataPath: dataPath + '/riskPremium'
        });
    }

    if (productGroup != lifeInsuranceConstants.productGroup.CSZ.descriptionRU &&
        !lifeInsuranceConstants.productGroupArray.GENCHK.includes(productCode) && !skipMigrated && !isCollectivePolicy) {
        if (!calcFromInsuredSum && !riskPremium) {
            validationErrors.push({
                errorCode: "riskPremiumIsRequired",
                errorDataPath: dataPath + '/riskPremium'
            });
        }
        if (calcFromInsuredSum && !riskInsuredSum) {
            validationErrors.push({
                errorCode: "riskInsuredSumIsRequired",
                errorDataPath: dataPath + '/riskInsuredSum'
            });
        }
    }

    if (!issueDate) {
        validationErrors.push({
            errorCode: "issueDateIsRequired",
            errorDataPath: dataPath + '/issueDate'
        });
    }

    if (!isCollectivePolicy && issueDate && applicationDate && issueDate < applicationDate) {
        validationErrors.push({
            errorCode: "applicationDateLessThanIssueDate",
            errorDataPath: dataPath + '/applicationDate'
        });
    }

    if (issueDate && originalReceiptDate && originalReceiptDate < issueDate) {
        validationErrors.push({
            errorCode: "originalReceiptDateLessThanIssueDate",
            errorDataPath: dataPath + '/originalReceiptDate'
        });
    }

    if (!this.businessContext.entityType) {
        if (!isCollectivePolicy && currentDate && receiptDate && currentDate < receiptDate) {
            validationErrors.push({
                errorCode: "receiptDateLessThancurrentDate",
                errorDataPath: dataPath + '/receiptDate'
            });
        }

        if (!isCollectivePolicy && currentDate && acceptToWorkDate && currentDate < acceptToWorkDate) {
            validationErrors.push({
                errorCode: "acceptToWorkDateLessThancurrentDate",
                errorDataPath: dataPath + '/acceptToWorkDate'
            });
        }
    }

    if (typeof window == "undefined" && !isSpecificSales) { // for testing
        if (contractType == lifeInsuranceConstants.contractType.Quote) { // only on quote
            if (!['Issued', 'Cancelled', 'Rejected', 'InfoRequest'].includes(documentState)) { // exclude end states and InfoRequest
                if (!isNoteProduct(productCode)) {
                    if (issueDate) {
                        const issueDateBeforeCurrentDate = DateTimeUtils.isBefore(issueDate, currentDate);
                        const issueDateAfterCurrentDate3 = DateTimeUtils.isAfter(issueDate, DateTimeUtils.addDays(currentDate, 3));
                        if (issueDateBeforeCurrentDate || issueDateAfterCurrentDate3) {
                            validationErrors.push({
                                errorCode: "daysBetweenCurrentDateIssueDate",
                                errorDataPath: dataPath + '/issueDate'
                            });
                        }
                    }
                }
            }
        }
    }

    if (!isCollectivePolicy && isCreatedByOperations && !applicationDate) {
        validationErrors.push({
            errorCode: "applicationDateIsRequired",
            errorDataPath: dataPath + '/applicationDate'
        });
    }

    if (!isCollectivePolicy && isCreatedByOperations && !receiptDate) {
        validationErrors.push({
            errorCode: "receiptDateIsRequired",
            errorDataPath: dataPath + '/receiptDate'
        });
    }

    if (!isCollectivePolicy && isCreatedByOperations && !acceptToWorkDate) {
        validationErrors.push({
            errorCode: "acceptToWorkDateIsRequired",
            errorDataPath: dataPath + '/acceptToWorkDate'
        });
    }

    if (riskPremiumForMinMaxVlidation && riskPremiumForMinMaxVlidation < minPremium) {
        validationErrors.push({
            errorCode: "riskPremiumMin",
            errorDataPath: dataPath + '/riskPremium',
            reference: {
                entity: {
                    minPremium: minPremium === undefined ? "ограничивается условиями продукта" : printoutsHelper.formatMoneyPrint(minPremium),
                    maxPremium: maxPremium === undefined ? "ограничивается условиями продукта" : printoutsHelper.formatMoneyPrint(maxPremium)
                }
            }
        });
    }

    if (riskPremiumForMinMaxVlidation && riskPremiumForMinMaxVlidation > maxPremium && !skipMaxPremValid) {
        validationErrors.push({
            errorCode: "riskPremiumMax",
            errorDataPath: dataPath + '/riskPremium',
            reference: {
                entity: {
                    minPremium: minPremium === undefined ? "ограничивается условиями продукта" : printoutsHelper.formatMoneyPrint(minPremium),
                    maxPremium: maxPremium === undefined ? "ограничивается условиями продукта" : printoutsHelper.formatMoneyPrint(maxPremium)
                }
            }
        });
    }

    if (endowmentInsuredSum && maxInsuredSumMainRisk && endowmentInsuredSum > maxInsuredSumMainRisk) {
        validationErrors.push({
            errorCode: "endowmentInsuredSum",
            errorDataPath: '/Body/risks'
        });
    }

    // really strange, so hardcoded for now, most probably will be changed soon
    const DLPSS36404Risk = risks.find(r => ['DLPSS36404'].includes(r.risk.riskCode));
    const DLPSS36404InsuredSum = DLPSS36404Risk && DLPSS36404Risk.riskInsuredSum;
    if (DLPSS36404InsuredSum && maxInsuredSumMainRisk && DLPSS36404InsuredSum > maxInsuredSumMainRisk) {
        validationErrors.push({
            errorCode: "DLPSS36404InsuredSum",
            errorDataPath: '/Body/risks'
        });
    }

    const maxInsuredSumMainRiskZENIT = 10500000;
    const DLPSS36404RiskZENIT = risks.find(r => ['DLPSS36404'].includes(r.risk.riskCode));
    const ecofZenit = [lifeInsuranceConstants.product.ECOF2ZENIT].includes(productCode)
        && issueForm == lifeInsuranceConstants.issueForm.ePolicy.issueFormCode;
    const DLPSS36404InsuredSumZENIT = DLPSS36404RiskZENIT?.riskInsuredSum ? DLPSS36404RiskZENIT?.riskInsuredSum : 0;
    if (DLPSS36404InsuredSumZENIT && maxInsuredSumMainRiskZENIT && DLPSS36404InsuredSumZENIT > maxInsuredSumMainRiskZENIT && ecofZenit) {
        validationErrors.push({
            errorCode: "DLPSS36404InsuredSumEcofZenit",
            errorDataPath: '/Body/risks'
        });
    }

    const amendmentType = this.businessContext.configurationDimensions.amendmentType;
    const amendmentData = this.businessContext.rootData.amendmentData?.finChangeAmendmentData;
    const amendmentEffectiveDate = amendmentData?.mainAttributes?.amendmentEffectiveDate;

    if (amendmentType !== changeAmendmentTypes.financialChange && !risks.some(x => x.startDate == startDate)) {

        validationErrors.push({
            errorCode: "hasNotRiskStartDateEqualsContractStartDate",
            errorDataPath: '/Body/risks'
        });
    }
    else if (amendmentType === changeAmendmentTypes.financialChange && !risks.some(x => x.startDate === amendmentEffectiveDate)) {

        validationErrors.push({
            errorCode: "hasNotRiskStartDateEqualsAmendmentEffectiveDate",
            errorDataPath: '/Body/risks'
        });
    }

    if (amendmentType !== changeAmendmentTypes.financialChange && risks.some(x => x.startDate < startDate)) {

        validationErrors.push({
            errorCode: "riskStartDateLessContractStartDate",
            errorDataPath: '/Body/risks'
        });
    }
    else if (amendmentType === changeAmendmentTypes.financialChange && risks.some(x => x.startDate < amendmentEffectiveDate)) {

        validationErrors.push({
            errorCode: "riskStartDateLessContractStartDate",
            errorDataPath: '/Body/risks'
        });
    }

    if (amendmentType === changeAmendmentTypes.financialChange && risks.some(x => x.endDate > policyTerms.endDate)) {

        validationErrors.push({
            errorCode: "riskEndDateGreaterContractEndDate",
            errorDataPath: '/Body/risks'
        });
    }

    if (isFixedRate && !exchangeRate) {
        validationErrors.push({
            errorCode: "exchangeRateIsRequired",
            errorDataPath: dataPath + '/exchangeRate'
        });
    }

    const allowCalcFromPremium = productConf?.allowCalcFromPremium;
    const allowCalcFromInsuredSum = productConf?.allowCalcFromInsuredSum;
    if (!skipMigrated) {
        if (!isCollectivePolicy || withTarification) {
            if (
                (!allowCalcFromPremium && !calcFromInsuredSum)
                ||
                (!allowCalcFromInsuredSum && calcFromInsuredSum)
            ) {
                validationErrors.push({
                    errorCode: "calcFromInconsistency",
                    errorDataPath: dataPath + '/calcFromInsuredSum'
                });
            }
        }
    }

    if (contractType == lifeInsuranceConstants.contractType.Quote && isSpecialOfferCheckbox) {
        validationErrors.push({
            errorCode: "productReleaseIsPossibleOnlyWithcomplexSales",
            severity: "Note",
            errorDataPath: dataPath + '/isSpecialOffer'
        });
    }

    return validationErrors;
};
