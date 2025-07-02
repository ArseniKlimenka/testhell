'use strict';

const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");
const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { checkFullContains, checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getArrayOfUniqueObjects } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { businessRules } = require('@adinsure/runtime');
const { productConfigurationFilter } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');
const emptyValue = '';

function prepareInputForGetEFRProductsFiltred(input, sinkExchange) {
    return {
        input: {
            data: {
                criteria: {
                    productCodeSap: input.efrProduct.product,
                    productTypeAdInsure: input.efrProduct.productType,
                    productTariff: input.efrProduct.prdtarv,
                    productVersion: input.efrProduct.varianc,
                    agent: input.efrAgent.sbuvvnu,
                    cover: input.efrCover
                }
            }
        }
    };
}

function getEFRProductsFiltred(sinkResult, sinkInput, sinkExchange, context) {

    const EFRProductsFiltredMapping = getEFRProductsFiltredMapping(sinkResult, sinkInput);

    const covers = EFRProductsFiltredMapping.covers;
    const resultDataObjects = EFRProductsFiltredMapping.resultDataObjects;

    const vpdausmCovers = resultDataObjects.filter(item => item.vpdausm).map(item => item.cover);
    const vpdausmCoverValues = resultDataObjects.filter(item => vpdausmCovers.includes(item.cover)).map(item => item.vpdausm);
    const vpdausmCoversInRequest = checkVpdausmCoversInRequest(vpdausmCovers, covers);
    if (vpdausmCoversInRequest > 1) {
        setMessageWithoutServiceError(sinkExchange, `E: Должен быть указан только один из каверов: ${vpdausmCovers}, т.к. для каверов указаны значения в столбце vpdausm: ${vpdausmCoverValues}.`);
        return;
    }

    const riskMandatoryAll = resultDataObjects.filter(item => item.cover && item.riskMandatory == lifeInsuranceConstants.efrRiskMandatory.All).map(item => item.cover);
    if (riskMandatoryAll && riskMandatoryAll.length > 0 && !checkFullContains(covers, riskMandatoryAll)) {
        setMessageWithoutServiceError(sinkExchange, `E: Переданы не все обязательные каверы. В рамках продукта, тарифа, варианта должны быть переданы обязательные каверы: ${riskMandatoryAll}.`);
        return;
    }

    const riskMandatoryAtLeastOne = resultDataObjects.filter(item => item.cover && item.riskMandatory == lifeInsuranceConstants.efrRiskMandatory.AtLeastOne).map(item => item.cover);
    if (riskMandatoryAtLeastOne && riskMandatoryAtLeastOne.length > 0 && !checkAvailabilitySome(covers, riskMandatoryAtLeastOne)) {
        setMessageWithoutServiceError(sinkExchange, `E: Переданы не все обязательные каверы. В рамках продукта, тарифа, варианта должен быть передан хотя бы один обязательный кавер из списка: ${riskMandatoryAtLeastOne}.`);
        return;
    }

    const resultDataObjectsWithCovers = resultDataObjects.filter(
        item => covers.includes(item.cover)
    );
    const riskMandatoryPaired = resultDataObjectsWithCovers.filter(item => item.cover && item.riskMandatory == lifeInsuranceConstants.efrRiskMandatory.Paired).map(item => item.cover);
    const riskPairedCoversInput = riskMandatoryPaired.filter(item => covers.includes(item));
    const riskMandatoryPairedCoversInput = resultDataObjectsWithCovers.filter(item => riskPairedCoversInput.includes(item.cover)).map(item => item.vpdvorm).filter(item => item != emptyValue);
    if (riskPairedCoversInput && riskPairedCoversInput.length > 0 &&
        riskMandatoryPairedCoversInput && riskMandatoryPairedCoversInput.length > 0 &&
        !checkFullContains(riskPairedCoversInput, riskMandatoryPairedCoversInput)) {
        if (riskPairedCoversInput.length == 1) {
            setMessageWithoutServiceError(sinkExchange, `E: Переданы не все обязательные каверы. В рамках продукта, тарифа, варианта и указанного парного кавера ${riskPairedCoversInput} должен быть передан парный кавер: ${riskMandatoryPairedCoversInput}.`);
            return;
        }
        if (riskPairedCoversInput.length > 1) {
            setMessageWithoutServiceError(sinkExchange, `E: Переданы не все обязательные каверы. В рамках продукта, тарифа, варианта и указанных парных каверов ${riskPairedCoversInput} должны быть переданы парные каверы: ${riskMandatoryPairedCoversInput}.`);
            return;
        }
    }

    const adinsureRisks = resultDataObjectsWithCovers.map(item => {
        return {
            risk: {
                riskShortDescription: formatUtils.changeEmptyValueToNull(item.riskShortName),
                riskFullDescription: formatUtils.changeEmptyValueToNull(item.riskFullName),
                riskCode: formatUtils.changeEmptyValueToNull(item.riskCode),
                sapRiskCode: formatUtils.changeEmptyValueToNull(item.risk),
                package: formatUtils.changeEmptyValueToNull(item.endowmentPackage),
                mandatory: formatUtils.changeEmptyValueToNull(item.mandatory),
                replaceableRisk: formatUtils.changeEmptyValueToNull(item.replaceableRisk),
                businessLine: formatUtils.changeEmptyValueToNull(item.businessLine),
                efrCoverCode: formatUtils.changeEmptyValueToNull(item.cover)
            }
        };
    });

    if (resultDataObjects && resultDataObjects.length > 0) {

        const resultDataObj = resultDataObjects[0];

        const result = {
            id: guidHelper.generate(),
            data: {
                adinsureProduct: {
                    productCode: formatUtils.changeEmptyValueToNull(resultDataObj.productCode),
                    productGroup: formatUtils.changeEmptyValueToNull(resultDataObj.productType),
                    productDescription: formatUtils.changeEmptyValueToNull(resultDataObj.productName),
                    productStrategy: formatUtils.changeEmptyValueToNull(resultDataObj.strategyCode),
                    productType: formatUtils.changeEmptyValueToNull(resultDataObj.productTypeAdInsure),
                    insuredisPolicyholder: formatUtils.changeEmptyValueToNull(resultDataObj.policyHolderIsInsured),
                    showFinKnowledgeQuestionnaire: resultDataObj.questionnaireShow,
                    efrProduct: sinkInput.input.data.criteria.productCodeSap,
                    efrPrdtarv: sinkInput.input.data.criteria.productTariff,
                    efrVarianc: sinkInput.input.data.criteria.productVersion,
                    efrObjectType: formatUtils.changeEmptyValueToNull(resultDataObj.objectType),
                    efrPackageNumber: formatUtils.changeEmptyValueToNull(resultDataObj.packageNumber),
                    efrAtLeastOneGroup: formatUtils.changeEmptyValueToNull(resultDataObj.zzAtLeastOneGroup),
                    efrVpdVorm: formatUtils.changeEmptyValueToNull(resultDataObj.vpdvorm),
                    efrVpdAusm: formatUtils.changeEmptyValueToNull(resultDataObj.vpdausm)
                },
                adinsureAgent: {
                    partnerDescription: formatUtils.changeEmptyValueToNull(resultDataObj.partnerShortDescription),
                    partnerCode: formatUtils.changeEmptyValueToNull(resultDataObj.partnerCode),
                    partnerBusinessCode: formatUtils.changeEmptyValueToNull(resultDataObj.partnerBusinessCode),
                    efrAgent: sinkInput.input.data.criteria.agent
                },
                adinsureConditions: {
                    endowmentPaymentVariantCode: formatUtils.changeEmptyValueToNull(resultDataObj.endowmentPayment),
                    endowmentPaymentVariantDescription: formatUtils.changeEmptyValueToNull(resultDataObj.endowmentPaymentDescription),
                    currencyCode: formatUtils.changeEmptyValueToNull(resultDataObj.currencyCode),
                    currencyNumericCode: formatUtils.changeEmptyValueToNull(resultDataObj.currencyNumericCode),
                    currencyDesc: formatUtils.changeEmptyValueToNull(resultDataObj.currencyDescription)
                },
                adinsureRisks: adinsureRisks
            }
        };

        sinkExchange.result = result;

    } else {
        setMessageWithoutServiceError(sinkExchange, 'E: Подходящих результатов по вашему запросу не найдено.');
        return;
    }

}

function getEFRProductsFiltredMapping(sinkResult, sinkInput) {
    const resultData = sinkResult.data.map(data => data.resultData);

    const criteria = sinkInput.input.data.criteria;
    const agent = criteria.agent;
    const coversInput = criteria.cover;
    const covers = coversInput && coversInput.length > 0 ? coversInput.map(item => item.deckuac) : [];
    const productCodeSap = criteria.productCodeSap;
    const productTariff = criteria.productTariff;
    const productVersion = criteria.productVersion;

    const resultDataObjects = resultData.filter(
        item => item.agent == agent &&
            item.productCodeSap == productCodeSap &&
            item.productTariff == productTariff &&
            item.productVersion == productVersion
    );

    return {
        resultData,
        criteria,
        agent,
        coversInput,
        covers,
        productCodeSap,
        productTariff,
        productVersion,
        resultDataObjects
    };
}

function checkVpdausmCoversInRequest(vpdausmCovers, covers) {
    let vpdausmCoversInRequest = 0;
    for (let i = 0; i < vpdausmCovers.length; i++) {
        for (let j = 0; j < covers.length; j++) {
            if (vpdausmCovers[i] == covers[j]) {
                ++vpdausmCoversInRequest;
            }
        }
    }

    return vpdausmCoversInRequest;
}

function checkVpdausmCoversInRequestTest(sinkResult, sinkInput) {
    const EFRProductsFiltredMapping = getEFRProductsFiltredMapping(sinkResult, sinkInput);

    const covers = EFRProductsFiltredMapping.covers;
    const resultDataObjects = EFRProductsFiltredMapping.resultDataObjects;

    const vpdausmCovers = resultDataObjects.filter(item => item.vpdausm).map(item => item.cover);
    const vpdausmCoverValues = resultDataObjects.filter(item => vpdausmCovers.includes(item.cover)).map(item => item.vpdausm);
    const vpdausmCoversInRequest = checkVpdausmCoversInRequest(vpdausmCovers, covers);
    return vpdausmCoversInRequest;
}

function prepareInputForGetEFRProductsReverseOptional(input, sinkExchange) {
    return {
        input: {
            data: {
                criteria: {
                    productTypeAdInsure: input.productGroup,
                    productCode: input.productCode,
                    strategyCode: input.investmentStrategyCode,
                    risks: input.risks,
                    productActiveTo: input.activeTo,
                    isProductClosed: input.isProductClosed
                }
            }
        }
    };
}

function getEFRProductsReverseOptional(sinkResult, sinkInput, sinkExchange, context) {

    const resultFiltered = sinkResult.data.map(data => data.resultData);

    if (resultFiltered.length == 0) {
        setMessageWithoutServiceError(sinkExchange, 'E: Подходящих результатов по вашему запросу не найдено.');
        return;
    }

    const groupedProducts = [];
    let groupedByCodeTariffVersion = [];
    for (let i = 0; i <= resultFiltered.length; i++) {
        if (groupedByCodeTariffVersion && groupedByCodeTariffVersion.length > 0) {
            groupedProducts.push({
                mapIds: [...new Set(groupedByCodeTariffVersion.map(item => item.mapId))].toString(),
                efrProductGroupCode: [...new Set(groupedByCodeTariffVersion.map(item => item.productTypeCode))].toString(),
                products: {
                    efrProductCode: [...new Set(groupedByCodeTariffVersion.map(item => item.productCodeSap))].toString(),
                    efrProductDescription: [...new Set(groupedByCodeTariffVersion.map(item => item.productName))].toString(),
                    efrTariff: [...new Set(groupedByCodeTariffVersion.map(item => item.productTariff))].toString(),
                    efrVariant: [...new Set(groupedByCodeTariffVersion.map(item => item.productVersion))].toString()
                },
                covers: groupedByCodeTariffVersion.map(item => {
                    return {
                        cover: item.cover
                    };
                }),
                risks: groupedByCodeTariffVersion.map(item => {
                    return {
                        efrRiskCode: item.risk,
                        efrRiskDescription: item.riskShortNameSap,
                        efrRiskMandatory: item.riskMandatory
                    };
                }),
                investmentStrategies: groupedByCodeTariffVersion.map(item => {
                    return {
                        efrInvestmentStrategyType: item.strategyType,
                        efrInvestmentStrategyCode: item.strategyCodeDescription,
                        efrInvestmentStrategyDescription: item.indexName
                    };
                }),
                efrObjectType: [...new Set(groupedByCodeTariffVersion.map(item => item.objectType))].toString(),
                efrPackages: groupedByCodeTariffVersion.map(item => {
                    return {
                        packageNumber: item.packageNumber
                    };
                }),
                efrAtLeastGroup: [...new Set(groupedByCodeTariffVersion.map(item => item.zzAtLeastOneGroup))].toString(),
                efrVpdVorm: groupedByCodeTariffVersion.map(item => {
                    return {
                        vpdvorm: item.vpdvorm
                    };
                }),
                efrVpdAusm: [...new Set(groupedByCodeTariffVersion.map(item => item.efrVpdAusm))].toString(),
                efrQuestionaire: groupedByCodeTariffVersion.map(item => {
                    return {
                        efrQuestionaireCode: item.questionnaireCode,
                        efrQuestionaireMandatory: item.questionnaireMandatory
                    };
                }),
            });

            if (i == resultFiltered.length) { break; }
        }

        groupedByCodeTariffVersion = [];
        const mapIds = groupedProducts.map(item => item.mapIds).toString();
        for (let j = i; j < resultFiltered.length; j++) {
            if (resultFiltered[i].productTypeCode == resultFiltered[j].productTypeCode &&
                resultFiltered[i].productCodeSap == resultFiltered[j].productCodeSap &&
                resultFiltered[i].productTariff == resultFiltered[j].productTariff &&
                resultFiltered[i].productVersion == resultFiltered[j].productVersion) {

                if (!mapIds.includes(resultFiltered[j].mapId)) {
                    groupedByCodeTariffVersion.push(resultFiltered[j]);
                }
            }
        }
    }

    const res = [];
    for (let i = 0; i < groupedProducts.length; i++) {

        const currentEFRProductGroupCode = groupedProducts[i].efrProductGroupCode;
        const currentEFRProductCode = groupedProducts[i].products.efrProductCode;
        const currentEFRProductDescription = groupedProducts[i].products.efrProductDescription;
        const currentEFRTariff = groupedProducts[i].products.efrTariff;
        const currentEFRVariant = groupedProducts[i].products.efrVariant;
        const currentCovers = groupedProducts[i].covers;
        const currentRisks = groupedProducts[i].risks;
        const currentInvestmentStrategies = groupedProducts[i].investmentStrategies;
        const currentEFRObjectType = groupedProducts[i].efrObjectType;
        const currentEFRPackages = groupedProducts[i].efrPackages;
        const currentEFRAtLeastGroup = groupedProducts[i].efrAtLeastGroup;
        const currentEFRVpdVorm = groupedProducts[i].efrVpdVorm;
        const currentEFROVpdAusm = groupedProducts[i].efrVpdAusm;
        const currentEFRuestionaire = groupedProducts[i].efrQuestionaire;

        if (currentEFRProductGroupCode != (res.filter(item => item.efrProductGroupCode == currentEFRProductGroupCode)
            .map(item => item.efrProductGroupCode).toString())) {
            res.push({
                efrProductGroupCode: currentEFRProductGroupCode,
                products: [{
                    efrProductCode: currentEFRProductCode,
                    efrProductDescription: currentEFRProductDescription,
                    efrTariff: currentEFRTariff,
                    efrVariant: currentEFRVariant,
                    covers: currentCovers,
                    risks: currentRisks,
                    investmentStrategies: currentInvestmentStrategies,
                    efrObjectType: currentEFRObjectType,
                    efrPackages: currentEFRPackages,
                    efrAtLeastGroup: currentEFRAtLeastGroup,
                    efrVpdVorm: currentEFRVpdVorm,
                    efrVpdAusm: currentEFROVpdAusm,
                    efrQuestionaire: currentEFRuestionaire
                }],
            });
        } else {
            res[res.findIndex(item => item.efrProductGroupCode == currentEFRProductGroupCode)]?.products?.push({
                efrProductCode: currentEFRProductCode,
                efrProductDescription: currentEFRProductDescription,
                efrTariff: currentEFRTariff,
                efrVariant: currentEFRVariant,
                covers: currentCovers,
                risks: currentRisks,
                investmentStrategies: currentInvestmentStrategies,
                efrObjectType: currentEFRObjectType,
                efrPackages: currentEFRPackages,
                efrAtLeastGroup: currentEFRAtLeastGroup,
                efrVpdVorm: currentEFRVpdVorm,
                efrVpdAusm: currentEFROVpdAusm,
                efrQuestionaire: currentEFRuestionaire
            });
        }
    }

    if (res && res.length > 0) {

        const result = {
            id: guidHelper.generate(),
            data: res
        };

        sinkExchange.result = result;

    } else {
        setMessageWithoutServiceError(sinkExchange, 'E: Подходящих результатов по вашему запросу не найдено.');
        return;
    }

}

function getEFRProducts(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults, currentDate) {

    const productConfigurations = additionalDataSourcesResults?.GetProductConfigurationDataSource?.data?.map(i => i.resultData);

    let resultData = sinkResult.data.map(data => data.resultData);

    resultData = resultData.filter(item => DateTimeUtils.isAfterOrEqual(item.productActiveTo) || !item.productActiveTo);
    resultData = resultData.filter(item => item.efr);

    let covers = resultData.map(item => {
        return {
            cover: {
                productCode: formatUtils.changeEmptyValueToNull(item.productCodeSap),
                tarif: formatUtils.changeEmptyValueToNull(item.productTariff),
                coverCode: formatUtils.changeEmptyValueToNull(item.cover),
                coverName: formatUtils.changeEmptyValueToNull(item.riskShortNameSap)
            }
        };
    });
    covers = getArrayOfUniqueObjects(covers);

    let risks = resultData.map(item => {
        return {
            risk: {
                coverCode: formatUtils.changeEmptyValueToNull(item.cover),
                riskCode: formatUtils.changeEmptyValueToNull(item.risk),
                riskFullName: formatUtils.changeEmptyValueToNull(item.riskFullNameSap)
            }
        };
    });
    risks = getArrayOfUniqueObjects(risks);

    let products = resultData.map(item => {
        return {
            product: {
                productCode: formatUtils.changeEmptyValueToNull(item.productCodeSap)
            }
        };
    });
    products = getArrayOfUniqueObjects(products);

    let surveys = resultData.map(item => {
        return {
            survey: {
                productCode: formatUtils.changeEmptyValueToNull(item.productCodeSap),
                surveyId: formatUtils.changeEmptyValueToNull(item.questionnaireCode)
            }
        };
    });
    surveys = getArrayOfUniqueObjects(surveys);

    let variants = resultData.map(item => {
        return {
            variant: {
                productCode: formatUtils.changeEmptyValueToNull(item.productCodeSap),
                variantCode: formatUtils.changeEmptyValueToNull(item.productVersion),
                InshdFlg: getInshdFlg(item.policyHolderIsInsured)
            }
        };
    });
    variants = getArrayOfUniqueObjects(variants);

    let ageLimits = resultData.map(item => {
        return {
            ageLimit: {
                productCode: formatUtils.changeEmptyValueToNull(item.productCodeSap),
                variantCode: formatUtils.changeEmptyValueToNull(item.productVersion),
                objectCode: formatUtils.changeEmptyValueToNull(item.objectType),
                coverCode: formatUtils.changeEmptyValueToNull(item.cover),
                coverMandatory: formatUtils.changeEmptyValueToNull(item.riskMandatory),
                ageFromW: formatUtils.changeEmptyValueToNull(item.insuredMinAgeForCover),
                ageToW: formatUtils.changeEmptyValueToNull(item.insuredMaxAgeForCover),
                ageFromM: formatUtils.changeEmptyValueToNull(item.insuredMinAgeForCover),
                ageToM: formatUtils.changeEmptyValueToNull(item.insuredMaxAgeForCover)
            }
        };
    });
    ageLimits = getArrayOfUniqueObjects(ageLimits);

    let risksInPackages = resultData.map(item => {
        return {
            riskInPackage: {
                productCode: formatUtils.changeEmptyValueToNull(item.productCodeSap),
                variantCode: formatUtils.changeEmptyValueToNull(item.productVersion),
                coverCode: formatUtils.changeEmptyValueToNull(item.cover),
                mustWithCoverCode: formatUtils.changeEmptyValueToNull(item.vpdvorm),
                PrereqGroup: formatUtils.changeEmptyValueToNull(item.zzAtLeastOneGroup),
                ZzatleastoneGroup: formatUtils.changeEmptyValueToNull(item.zzAtLeastOneGroup),
                packageCode: formatUtils.changeEmptyValueToNull(item.packageNumber)
            }
        };
    });
    risksInPackages = getArrayOfUniqueObjects(risksInPackages);

    const services = [];
    const productsInfo = [];

    resultData.forEach(function (row) {
        if (productsInfo.filter(
            item => item.productCode == row.productCode &&
                item.productCodeSap == row.productCodeSap &&
                item.tarif == row.productTariff &&
                item.variantCode == row.productVersion).length == 0) {
            productsInfo.push({
                productCode: formatUtils.changeEmptyValueToNull(row.productCode),
                tarif: formatUtils.changeEmptyValueToNull(row.productTariff),
                cover: formatUtils.changeEmptyValueToNull(row.cover),
                variantCode: formatUtils.changeEmptyValueToNull(row.productVersion),
                productCodeSap: formatUtils.changeEmptyValueToNull(row.productCodeSap),
                policyHolderIsInsured: formatUtils.changeEmptyValueToNull(row.policyHolderIsInsured)
            });
        }
    });

    productsInfo.forEach(function (productInfo) {

        const productCode = productInfo.productCode;
        const productCodeSap = productInfo.productCodeSap;
        const cover = productInfo.cover;
        const policyHolderIsInsured = productInfo.policyHolderIsInsured;

        const tarif = productInfo.tarif;
        const variantCode = productInfo.variantCode;

        const issueDate = currentDate;
        const productConf = productConfigurationFilter(productConfigurations, false, productCode, issueDate);
        const additionalServices = productConf?.additionalServices ?? [];
        const giftServices = productConf?.giftServices ?? [];
        const allServices = [...new Set([...additionalServices, ...giftServices])];

        allServices?.forEach(function (serviceCode) {

            const additionalServicesConfiguration = businessRules.getRuleByVersion('AdditionalServicesConfigurationRule', 1).rule;
            const serviceConf = additionalServicesConfiguration({ serviceCode, productCode, issueDate }).result;

            if (serviceConf) {
                services.push({
                    service: {
                        productCode: productCodeSap ? productCodeSap : null,
                        tarif: tarif ? tarif : null,
                        coverCode: cover ? cover : null,
                        variantCode: variantCode ? variantCode : null,
                        serviceCode: serviceCode ? serviceCode : null,
                        serviceName: serviceConf.serviceName ? serviceConf.serviceName : null,
                        isGiftService: giftServices.includes(serviceCode) ? 'X' : null,
                        minSumPrem: getServiceMinSumPrem(productConf, giftServices, serviceCode),
                        groupCode: serviceConf.groupCode ? serviceConf.groupCode : null,
                        groupName: serviceConf.groupName ? serviceConf.groupName : null
                    }
                });
            }

        });
    });

    const resultStrategyCode = resultData.filter(i => i.productCode && i.strategyCode);
    const allRecommendedStrategies = sinkExchange.recommendedStrategies;
    const preparedStrategiesMapping = [];
    const strategies = [];

    resultStrategyCode.forEach(function (row) {
        if (preparedStrategiesMapping.filter(
            item => item.productCode == row.productCode &&
                item.tarif == row.productTariff &&
                item.variantCode == row.productVersion &&
                item.strategyCode == row.strategyCode
        ).length == 0) {
            preparedStrategiesMapping.push({
                productCode: formatUtils.changeEmptyValueToNull(row.productCode),
                productCodeSap: formatUtils.changeEmptyValueToNull(row.productCodeSap),
                tarif: formatUtils.changeEmptyValueToNull(row.productTariff),
                variantCode: formatUtils.changeEmptyValueToNull(row.productVersion),
                strategyCode: formatUtils.changeEmptyValueToNull(row.strategyCode),
                strategyCodeDescription: formatUtils.changeEmptyValueToNull(row.strategyCodeDescription)
            });
        }
    });

    preparedStrategiesMapping.forEach(function (efrStrategy) {

        const efrProductCode = efrStrategy.productCode;
        const efrProductCodeSap = efrStrategy.productCodeSap;
        const efrTarif = efrStrategy.tarif;
        const efrVariantCode = efrStrategy.variantCode;
        const efrStrategyCode = efrStrategy.strategyCode;
        const efrStrategyCodeDescription = efrStrategy.strategyCodeDescription;

        allRecommendedStrategies?.forEach(function (recommendedStrategy) {

            if (recommendedStrategy?.productCode?.toLocaleLowerCase() == efrProductCode?.toLocaleLowerCase() &&
                recommendedStrategy?.strategyCode?.toLocaleLowerCase() == efrStrategyCode?.toLocaleLowerCase()) {
                strategies.push({
                    strategy: {
                        productCode: efrProductCodeSap ? efrProductCodeSap : null,
                        tarif: efrTarif ? efrTarif : null,
                        variantCode: efrVariantCode ? efrVariantCode : null,
                        investmentStrategyCode: efrStrategyCode ? efrStrategyCode : null,
                        investmentStrategyDescription: efrStrategyCodeDescription ? efrStrategyCodeDescription : null,
                        isRecomended: recommendedStrategy.recommendationText ? 1 : 0,
                        recommendationText: recommendedStrategy.recommendationText ? recommendedStrategy.recommendationText : null,
                    }
                });
            }

        });
    });

    const result = {
        id: guidHelper.generate(),
        data: {
            covers: covers,
            risks: risks,
            products: products,
            surveys: surveys,
            variants: variants,
            ageLimits: ageLimits,
            risksInPackages: risksInPackages,
            services: services,
            strategies: strategies
        }
    };

    sinkExchange.result = result;

    return result;
}

function getInshdFlg(policyHolderIsInsured) {
    if (policyHolderIsInsured == '01') {
        return 'страхователь равен застрахованному лицу';
    } else if (policyHolderIsInsured == '02') {
        return 'страхователь не равен ЗЛ';
    }
    return null;

}

function getServiceMinSumPrem(productConf, giftServices, serviceCode) {
    if (giftServices.includes(serviceCode)) {
        if (productConf.giftServicesPremium) {
            return productConf.giftServicesPremium.toFixed(2);
        }
        return '0.0';

    }
    return null;

}

function setMessageWithoutServiceError(sinkExchange, message, code = 'ERROR') {
    sinkExchange.result = {
        errorResponse: {
            code: code,
            message: 'Javascript system error occurred: Message: ' + message
        }
    };
}

module.exports = {
    prepareInputForGetEFRProductsFiltred,
    getEFRProductsFiltred,
    checkVpdausmCoversInRequest,
    checkVpdausmCoversInRequestTest,
    prepareInputForGetEFRProductsReverseOptional,
    getEFRProductsReverseOptional,
    getEFRProducts
};
