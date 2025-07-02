'use strict';

const defaultValue = '';

module.exports = function resultMapping(input) {

    const output = {};

    output.mapId = input.MAP_ID ? input.MAP_ID : defaultValue;
    output.productName = input.PRODUCT_NAME ? input.PRODUCT_NAME : defaultValue;
    output.contractTerm = input.CONTRACT_TERM ? input.CONTRACT_TERM : defaultValue;
    output.productPrefix = input.PRODUCT_PREFIX ? input.PRODUCT_PREFIX : defaultValue;
    output.productCodeSap = input.PRODUCT_CODE_SAP ? input.PRODUCT_CODE_SAP : defaultValue;
    output.productTariff = input.PRODUCT_TARIFF ? input.PRODUCT_TARIFF : defaultValue;
    output.productVersion = input.PRODUCT_VERSION ? input.PRODUCT_VERSION : defaultValue;
    output.productTypeSap = input.PRODUCT_TYPE_SAP ? input.PRODUCT_TYPE_SAP : defaultValue;
    output.productTypeAdInsure = input.PRODUCT_TYPE_ADINSURE ? input.PRODUCT_TYPE_ADINSURE : defaultValue;
    output.cover = input.COVER ? input.COVER : defaultValue;
    output.risk = input.RISK ? input.RISK : defaultValue;
    output.riskShortNameSap = input.RISK_SHORT_NAME_SAP ? input.RISK_SHORT_NAME_SAP : defaultValue;
    output.riskFullNameSap = input.RISK_FULL_NAME_SAP ? input.RISK_FULL_NAME_SAP : defaultValue;
    output.riskMandatory = input.RISK_MANDATORY ? input.RISK_MANDATORY : defaultValue;
    output.objectType = input.OBJECT_TYPE ? input.OBJECT_TYPE : defaultValue;
    output.strategyType = input.STRATEGY_TYPE ? input.STRATEGY_TYPE : defaultValue;
    output.indexName = input.INDEX_NAME ? input.INDEX_NAME : defaultValue;
    output.strategyCodeDescription = input.STRATEGY_CODE_DESCRIPTION ? input.STRATEGY_CODE_DESCRIPTION : defaultValue;
    output.llob = input.LLOB ? input.LLOB : defaultValue;
    output.currency = input.CURRENCY ? input.CURRENCY : defaultValue;
    output.firstInstInto3Payments = input.FIRST_INST_INTO_3_PAYMENT ? input.FIRST_INST_INTO_3_PAYMENT : defaultValue;
    output.policyHolderIsInsured = input.POLICYHOLDER_IS_INSURED ? input.POLICYHOLDER_IS_INSURED : defaultValue;
    output.packageNumber = input.PACKAGE_NUMBER ? input.PACKAGE_NUMBER : defaultValue;
    output.zzAtLeastOneGroup = input.ZZATLEASTONE_GROUP ? input.ZZATLEASTONE_GROUP : defaultValue;
    output.vpdvorm = input.VPDVORM ? input.VPDVORM : defaultValue;
    output.vpdausm = input.VPDAUSM ? input.VPDAUSM : defaultValue;
    output.questionnaireCode = input.QUESTIONNAIRE_CODE ? input.QUESTIONNAIRE_CODE : defaultValue;
    output.questionnaireMandatory = input.QUESTIONNAIRE_MANDATORY ? input.QUESTIONNAIRE_MANDATORY : defaultValue;
    output.agent = input.AGENT ? input.AGENT : defaultValue;
    output.insuredMinAgeForCover = input.INSURED_MIN_AGE_FOR_COVER ? input.INSURED_MIN_AGE_FOR_COVER : defaultValue;
    output.insuredMaxAgeForCover = input.INSURED_MAX_AGE_FOR_COVER ? input.INSURED_MAX_AGE_FOR_COVER : defaultValue;
    output.productTypeCode = input.PRODUCT_TYPE_CODE ? input.PRODUCT_TYPE_CODE : defaultValue;
    output.id = input.ID ? input.ID : defaultValue;
    output.productCode = input.PRODUCT_CODE ? input.PRODUCT_CODE : defaultValue;
    output.strategyCode = input.STRATEGY_CODE ? input.STRATEGY_CODE : defaultValue;
    output.strategyDescriptionFull = input.STRATEGY_DESCRIPTION_FULL ? input.STRATEGY_DESCRIPTION_FULL : defaultValue;
    output.productType = input.PRODUCT_TYPE ? input.PRODUCT_TYPE : defaultValue;
    output.endowmentPayment = input.ENDOWMENT_PAYMENT ? input.ENDOWMENT_PAYMENT : defaultValue;
    output.endowmentPaymentDescription = input.ENDOWMENT_PAYMENT_DESCRIPTION ? input.ENDOWMENT_PAYMENT_DESCRIPTION : defaultValue;
    output.productDescription = input.PRODUCT_DESCRIPTION ? input.PRODUCT_DESCRIPTION : defaultValue;
    output.riskCode = input.RISK_CODE ? input.RISK_CODE : defaultValue;
    output.riskShortName = input.RISK_SHORT_NAME ? input.RISK_SHORT_NAME : defaultValue;
    output.riskFullName = input.RISK_FULL_NAME ? input.RISK_FULL_NAME : defaultValue;
    output.endowmentPackage = input.ENDOWMENT_PACKAGE ? input.ENDOWMENT_PACKAGE : defaultValue;
    output.mandatory = input.MANDATORY ? input.MANDATORY : defaultValue;
    output.businessLine = input.BUSINESS_LINE ? input.BUSINESS_LINE : defaultValue;
    output.replaceableRisk = input.REPLACEABLE_RISK ? input.REPLACEABLE_RISK : defaultValue;
    output.questionnaireShow = input.QUESTIONNAIRE_SHOW;
    output.partnerCode = input.PARTNER_CODE ? input.PARTNER_CODE : defaultValue;
    output.partnerShortDescription = input.PARTNER_SHORT_DESCRIPTION ? input.PARTNER_SHORT_DESCRIPTION : defaultValue;
    output.partnerBusinessCode = input.PARTNER_BUSINESS_CODE ? input.PARTNER_BUSINESS_CODE : defaultValue;
    output.currencyCode = input.CURRENCY_CODE ? input.CURRENCY_CODE : defaultValue;
    output.currencyNumericCode = input.CURRENCY_NUMERIC_CODE ? input.CURRENCY_NUMERIC_CODE : defaultValue;
    output.currencyDescription = input.CURRENCY_DESCRIPTION ? input.CURRENCY_DESCRIPTION : defaultValue;
    output.insuredMinAgeForProduct = input.INSURED_MIN_AGE_FOR_PRODUCT ? input.INSURED_MIN_AGE_FOR_PRODUCT : defaultValue;
    output.insuredMaxAgeForProduct = input.INSURED_MAX_AGE_FOR_PRODUCT ? input.INSURED_MAX_AGE_FOR_PRODUCT : defaultValue;
    output.productActiveTo = input.PRODUCT_ACTIVE_TO ? input.PRODUCT_ACTIVE_TO : defaultValue;
    output.efr = input.EFR ? input.EFR : defaultValue;

    return output;

};
