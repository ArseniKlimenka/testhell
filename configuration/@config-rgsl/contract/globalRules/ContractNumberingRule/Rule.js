'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function getnext(input) {

    // if number is already exists then do nothing
    if (input.number) {
        return {
            "number": input.number
        };
    }

    const stateCode = input?.metadata?.state?.Code;
    const configurationCodeName = input?.metadata?.configuration?.codeName;
    const contractType = input?.metadata?.configuration?.dimensions?.contractType;
    const originalNumber = input?.metadata?.originalNumber;
    const sequenceNumber = input?.sequenceNumber;
    const policyConfigurations = [
        lifeInsuranceConstants.productCode.AccumulatedLifeInsurancePolicy,
        lifeInsuranceConstants.productCode.EquityLifeInsurancePolicy,
        lifeInsuranceConstants.productCode.InvestmentLifeInsurancePolicy,
        lifeInsuranceConstants.productCode.MedLifeInsurancePolicy,
        lifeInsuranceConstants.productCode.RiskLifeInsurancePolicy,
        lifeInsuranceConstants.productCode.AccidentLifeInsurancePolicy,
        lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy
    ];

    // quotes
    if (configurationCodeName == lifeInsuranceConstants.productCode.AccumulatedLifeInsuranceQuote) {
        const sequenceName = "PAS.CONTRACT-NSZ-QUOTE";
        const template = "НСЖ-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }
    if (configurationCodeName == lifeInsuranceConstants.productCode.EquityLifeInsuranceQuote && stateCode != "OnReview") {
        const sequenceName = "PAS.CONTRACT-DSZ-QUOTE";
        const template = "ДСЖ-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }
    if (configurationCodeName == lifeInsuranceConstants.productCode.InvestmentLifeInsuranceQuote && !isNeedGenerateFutureNumber(input)) {
        const sequenceName = "PAS.CONTRACT-ISZ-QUOTE";
        const template = "ИСЖ-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }
    if (configurationCodeName == lifeInsuranceConstants.productCode.CreditLifeInsuranceQuote) {
        const sequenceName = "PAS.CONTRACT-CSJ-QUOTE";
        const template = "КСЖ-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }
    if (configurationCodeName == lifeInsuranceConstants.productCode.MedLifeInsuranceQuote) {
        const sequenceName = "PAS.CONTRACT-DMS-QUOTE";
        const template = "ДМС-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }
    if (configurationCodeName == lifeInsuranceConstants.productCode.RiskLifeInsuranceQuote && !isNeedGenerateFutureNumber(input)) {
        const sequenceName = "PAS.CONTRACT-RISK-QUOTE";
        const template = "РСЖ-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }
    if (configurationCodeName == lifeInsuranceConstants.productCode.AccidentLifeInsuranceQuote) {
        const sequenceName = "PAS.CONTRACT-NS-QUOTE";
        const template = "НС-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    if (configurationCodeName == lifeInsuranceConstants.productCode.RiskLifeInsuranceQuote && isNeedGenerateFutureNumber(input)) {


        const productPrefix = input?.commonBody?.attributes?.productPrefix;

        const futureContractNumber = input?.commonBody?.attributes?.futureContractNumber;
        if (futureContractNumber) {
            return {
                "number": futureContractNumber
            };
        }

        const sequenceName = "PAS.CONTRACT-RISK-POLICY";
        const template = productPrefix + "-" + "%08d";

        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    // policies
    if (policyConfigurations.includes(configurationCodeName) || isNeedGenerateFutureNumber(input)) {

        const futureContractNumber = input?.commonBody?.attributes?.futureContractNumber;
        if (futureContractNumber) {
            return {
                "number": futureContractNumber
            };
        }

        const isCreatedByOperations = input?.commonBody?.attributes?.isCreatedByOperations ?? false;
        const productStrategyCode = input?.commonBody?.attributes?.productStrategyCode;
        const productPrefix = input?.commonBody?.attributes?.productPrefix;
        const productPrefixByStrategy = input?.commonBody?.attributes?.productPrefixByStrategy;
        const startDate = input?.commonBody?.startDate;

        let finalPrefix = productStrategyCode && productPrefixByStrategy && productPrefixByStrategy[productStrategyCode] || productPrefix;

        if (configurationCodeName == 'CollectiveLifeInsurancePolicy') {

            if (finalPrefix?.length < 5) {
                finalPrefix += startDate.slice(2, 4);
            }

            if (finalPrefix == '31200') {
                finalPrefix = finalPrefix.slice(0, 3) + startDate.slice(2, 4);
            }
        }

        const issueCode = isCreatedByOperations ? "99" : "77";
        const sequenceName = "PAS.CONTRACT-NSZ-POLICY-" + finalPrefix;
        let template = finalPrefix + "-" + issueCode + "%06d";

        const isSpecialOffer = input?.commonBody?.attributes?.isSpecialOffer;

        if (isSpecialOffer) {
            const specialOfferNumber = 1;
            template += "/" + specialOfferNumber;
        }

        return {
            "sequenceName": sequenceName,
            "template": template
        };

    }

    // policies
    if (configurationCodeName == lifeInsuranceConstants.productCode.CreditLifeInsurancePolicy) {

        const productPrefix = input?.commonBody?.attributes?.productPrefix;
        const creditProgramId = input?.commonBody?.attributes?.creditProgramId;

        if (productPrefix == 'byCreditProgram' && creditProgramId && creditProgramId.indexOf('РЖ') >= 0) {

            const prefix = creditProgramId;
            const sequenceName = "PAS.CONTRACT-CSJ-POLICY-" + prefix.replace('РЖ', 'RZ');
            const template = prefix + "-" + "%07d";

            return {
                "sequenceName": sequenceName,
                "template": template
            };
        }

    }

    // amendments
    if (contractType == lifeInsuranceConstants.contractType.Amendment) {

        return {
            "number": originalNumber + "/" + sequenceNumber
        };
    }

    // default numbering
    return {
        "sequenceName": "PAS.CONTRACT",
        "template": "%d"
    };

};

function isNeedGenerateFutureNumber(input) {

    return input?.commonBody?.attributes?.isNeedGenerateFutureNumber ?? false;
}
