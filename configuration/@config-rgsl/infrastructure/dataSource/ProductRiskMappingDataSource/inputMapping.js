'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            mapId: undefined,
            productName: undefined,
            contractTerm: undefined,
            productPrefix: undefined,
            productCodeSap: undefined,
            productTariff: undefined,
            productVersion: undefined,
            productTypeSap: undefined,
            productTypeAdInsure: undefined,
            cover: undefined,
            risk: undefined,
            riskShortNameSap: undefined,
            riskFullNameSap: undefined,
            riskMandatory: undefined,
            objectType: undefined,
            strategyType: undefined,
            strategyCodeDescription: undefined,
            llob: undefined,
            currency: undefined,
            firstInstInto3Payments: undefined,
            policyHolderIsInsured: undefined,
            packageNumber: undefined,
            zzAtLeastOneGroup: undefined,
            vpdvorm: undefined,
            vpdausm: undefined,
            questionnaireCode: undefined,
            questionnaireMandatory: undefined,
            agent: undefined,
            insuredMinAgeForCover: undefined,
            insuredMaxAgeForCover: undefined,
            id: undefined,
            productCode: undefined,
            strategyCode: undefined,
            productType: undefined,
            endowmentPayment: undefined,
            endowmentPaymentDescription: undefined,
            productDescription: undefined,
            riskCode: undefined,
            riskShortName: undefined,
            riskFullName: undefined,
            endowmentPackage: undefined,
            mandatory: undefined,
            businessLine: undefined,
            replaceableRisk: undefined,
            questionnaireShow: undefined,
            partnerCode: undefined,
            partnerShortDescription: undefined,
            partnerBusinessCode: undefined,
            currencyCode: undefined,
            currencyNumericCode: undefined,
            currencyDescription: undefined,
            insuredMinAgeForProduct: undefined,
            insuredMaxAgeForProduct: undefined
        }
    };

    if (input.data && input.data.criteria) {

        if (input.data.criteria.mapId) {
            output.parameters.mapId = input.data.criteria.mapId;
        }

        if (input.data.criteria.productName) {
            output.parameters.productName = input.data.criteria.productName;
        }

        if (input.data.criteria.contractTerm) {
            output.parameters.contractTerm = input.data.criteria.contractTerm;
        }

        if (input.data.criteria.productPrefix) {
            output.parameters.productPrefix = input.data.criteria.productPrefix;
        }

        if (input.data.criteria.productCodeSap) {
            output.parameters.productCodeSap = input.data.criteria.productCodeSap;
        }

        if (input.data.criteria.productTariff) {
            output.parameters.productTariff = input.data.criteria.productTariff;
        }

        if (input.data.criteria.productVersion) {
            output.parameters.productVersion = input.data.criteria.productVersion;
        }

        if (input.data.criteria.productTypeSap) {
            output.parameters.productTypeSap = input.data.criteria.productTypeSap;
        }

        if (input.data.criteria.productTypeAdInsure) {
            output.parameters.productTypeAdInsure = input.data.criteria.productTypeAdInsure;
        }

        if (input.data.criteria.cover && input.data.criteria.cover.length > 0) {
            output.parameters.cover = input.data.criteria.cover.map(item => item.deckuac);
        }

        if (input.data.criteria.risk) {
            output.parameters.risk = input.data.criteria.risk;
        }

        if (input.data.criteria.riskShortNameSap) {
            output.parameters.riskShortNameSap = input.data.criteria.riskShortNameSap;
        }

        if (input.data.criteria.riskFullNameSap) {
            output.parameters.riskFullNameSap = input.data.criteria.riskFullNameSap;
        }

        if (input.data.criteria.riskMandatory) {
            output.parameters.riskMandatory = input.data.criteria.riskMandatory;
        }

        if (input.data.criteria.objectType) {
            output.parameters.objectType = input.data.criteria.objectType;
        }

        if (input.data.criteria.strategyType) {
            output.parameters.strategyType = input.data.criteria.strategyType;
        }

        if (input.data.criteria.strategyCodeDescription) {
            output.parameters.strategyCodeDescription = input.data.criteria.strategyCodeDescription;
        }

        if (input.data.criteria.llob) {
            output.parameters.llob = input.data.criteria.llob;
        }

        if (input.data.criteria.currency) {
            output.parameters.currency = input.data.criteria.currency;
        }

        if (input.data.criteria.firstInstInto3Payments) {
            output.parameters.firstInstInto3Payments = input.data.criteria.firstInstInto3Payments;
        }

        if (input.data.criteria.policyHolderIsInsured) {
            output.parameters.policyHolderIsInsured = input.data.criteria.policyHolderIsInsured;
        }

        if (input.data.criteria.packageNumber) {
            output.parameters.packageNumber = input.data.criteria.packageNumber;
        }

        if (input.data.criteria.zzAtLeastOneGroup) {
            output.parameters.zzAtLeastOneGroup = input.data.criteria.zzAtLeastOneGroup;
        }

        if (input.data.criteria.vpdvorm) {
            output.parameters.vpdvorm = input.data.criteria.vpdvorm;
        }

        if (input.data.criteria.vpdausm) {
            output.parameters.vpdausm = input.data.criteria.vpdausm;
        }

        if (input.data.criteria.questionnaireCode) {
            output.parameters.questionnaireCode = input.data.criteria.questionnaireCode;
        }

        if (input.data.criteria.questionnaireMandatory) {
            output.parameters.questionnaireMandatory = input.data.criteria.questionnaireMandatory;
        }

        if (input.data.criteria.agent) {
            output.parameters.agent = input.data.criteria.agent;
        }

        if (input.data.criteria.insuredMinAgeForCover) {
            output.parameters.insuredMinAgeForCover = input.data.criteria.insuredMinAgeForCover;
        }

        if (input.data.criteria.insuredMaxAgeForCover) {
            output.parameters.insuredMaxAgeForCover = input.data.criteria.insuredMaxAgeForCover;
        }

        if (input.data.criteria.id) {
            output.parameters.id = input.data.criteria.id;
        }

        if (input.data.criteria.productCode) {
            output.parameters.productCode = input.data.criteria.productCode;
        }

        if (input.data.criteria.strategyCode) {
            output.parameters.strategyCode = input.data.criteria.strategyCode;
        }

        if (input.data.criteria.productType) {
            output.parameters.productType = input.data.criteria.productType;
        }

        if (input.data.criteria.endowmentPayment) {
            output.parameters.endowmentPayment = input.data.criteria.endowmentPayment;
        }

        if (input.data.criteria.endowmentPaymentDescription) {
            output.parameters.endowmentPaymentDescription = input.data.criteria.endowmentPaymentDescription;
        }

        if (input.data.criteria.productDescription) {
            output.parameters.productDescription = input.data.criteria.productDescription;
        }

        if (input.data.criteria.riskCode) {
            output.parameters.riskCode = input.data.criteria.riskCode;
        }

        if (input.data.criteria.risks && input.data.criteria.risks.length > 0) {
            output.parameters.riskCodes = input.data.criteria.risks.map(i => i.riskCode);
        }

        if (input.data.criteria.riskShortName) {
            output.parameters.riskShortName = input.data.criteria.riskShortName;
        }

        if (input.data.criteria.riskFullName) {
            output.parameters.riskFullName = input.data.criteria.riskFullName;
        }

        if (input.data.criteria.endowmentPackage) {
            output.parameters.endowmentPackage = input.data.criteria.endowmentPackage;
        }

        if (input.data.criteria.mandatory) {
            output.parameters.mandatory = input.data.criteria.mandatory;
        }

        if (input.data.criteria.businessLine) {
            output.parameters.businessLine = input.data.criteria.businessLine;
        }

        if (input.data.criteria.replaceableRisk) {
            output.parameters.replaceableRisk = input.data.criteria.replaceableRisk;
        }

        if (input.data.criteria.questionnaireShow) {
            output.parameters.questionnaireShow = input.data.criteria.questionnaireShow;
        }

        if (input.data.criteria.partnerCode) {
            output.parameters.partnerCode = input.data.criteria.partnerCode;
        }

        if (input.data.criteria.partnerShortDescription) {
            output.parameters.partnerShortDescription = input.data.criteria.partnerShortDescription;
        }

        if (input.data.criteria.partnerBusinessCode) {
            output.parameters.partnerBusinessCode = input.data.criteria.partnerBusinessCode;
        }

        if (input.data.criteria.currencyCode) {
            output.parameters.currencyCode = input.data.criteria.currencyCode;
        }

        if (input.data.criteria.currencyNumericCode) {
            output.parameters.currencyNumericCode = input.data.criteria.currencyNumericCode;
        }

        if (input.data.criteria.currencyDescription) {
            output.parameters.currencyDescription = input.data.criteria.currencyDescription;
        }

        if (input.data.criteria.insuredMinAgeForProduct) {
            output.parameters.insuredMinAgeForProduct = input.data.criteria.insuredMinAgeForProduct;
        }

        if (input.data.criteria.insuredMaxAgeForProduct) {
            output.parameters.insuredMaxAgeForProduct = input.data.criteria.insuredMaxAgeForProduct;
        }

        if (input.data.criteria.productActiveTo) {
            output.parameters.productActiveTo = input.data.criteria.productActiveTo;
        }

        if (input.data.criteria.isProductClosed) {
            output.parameters.isProductClosed = input.data.criteria.isProductClosed;
        }

        if (input.data.criteria.contracts && input.data.criteria.contracts.length > 0) {
            output.parameters.contracts = true;
            output.parameters.contractProductDescription = input.data.criteria.contracts.map(item => item.productDescription);
            output.parameters.contractInvestmentStrategyDescription = input.data.criteria.contracts.map(item => item.investmentStrategyDescription);
            output.parameters.contractProductCode = input.data.criteria.contracts.map(item => item.productCode);
            output.parameters.contractProductGroupDescription = input.data.criteria.contracts.map(item => item.productGroupDescription);
            this.businessContext.contracts = input.data.criteria.contracts;
        }

    }

    return output;

};
