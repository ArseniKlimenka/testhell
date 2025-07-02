const { inquiryConfiguratuionName,
    policyInquiryConfiguratuionName,
    cnlInquiryConfiguratuionName,
    verificationConfiguratuionName,
    lifeInsuranceRequestConfigurationName,
    deduplicationDocumentConfigurationName,
    accountingCertificateConfigurationName,
    endowmentInquiryConfiguratuionName,
    assetConfigurationName } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { LocalDate } = require('@js-joda/core');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function getnext(input) {

    // if number is already exists then do nothing
    if (input.number) {
        return {
            "number": input.number
        };
    }

    const configurationCodeName = input.metadata.configuration.codeName;

    // numbering function selection
    if (configurationCodeName == inquiryConfiguratuionName ||
        configurationCodeName == policyInquiryConfiguratuionName ||
        configurationCodeName == cnlInquiryConfiguratuionName ||
        configurationCodeName == endowmentInquiryConfiguratuionName) {
        const sequenceName = "PAS.CONTRACT-INQUIRY";
        const template = "ЗАПРОС-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    if (configurationCodeName == verificationConfiguratuionName) {
        const sequenceName = "PAS.CONTRACT-VERIFICATION";
        const template = "ВВ-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    if (configurationCodeName == lifeInsuranceRequestConfigurationName) {
        const sequenceName = "PAS.CONTRACT-REQUEST";
        const template = "ЗАЯВКА-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    if (configurationCodeName == deduplicationDocumentConfigurationName) {
        const sequenceName = "PAS.CONTRACT-DEDUPLICATION";
        const template = "ДЕДУПЛИКАЦИЯ-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    if (configurationCodeName == 'RSD') {
        const sequenceName = 'ACC_IMPL.RSD_HUB';
        const template = 'РСД-%010d';
        return {
            'sequenceName': sequenceName,
            'template': template,
        };
    }

    if (configurationCodeName == 'CommissionAct') {
        const thisYear = LocalDate.now().year().toString();
        const sequenceName = `ACC_IMPL.CA_ACT.${thisYear}`;
        const template = `АВР${thisYear}-%06d`;
        return {
            'sequenceName': sequenceName,
            'template': template,
        };
    }

    if (configurationCodeName === 'InsuredEvent') {

        const thisYear = LocalDate.now().year().toString().substring(2);

        return {
            sequenceName: `CLM.INSURED_EVENT.${thisYear}`,
            template: `ССБ-%08d-${thisYear}`
        };
    }

    if (configurationCodeName === 'Endowment') {

        const eventTypeCode = getValue(input, 'commonBody.attributes.mainAttributes.eventType.code');
        let prefix = '';

        if (eventTypeCode === '300') {

            prefix = 'ДОЖ';
        }
        else if (eventTypeCode === '700') {

            prefix = 'ДИД';
        }

        const thisYear = LocalDate.now().year().toString().substring(2);

        return {
            sequenceName: `CLM.ENDOWMENT.${thisYear}`,
            template: `${prefix}-%08d-${thisYear}`
        };
    }

    if (configurationCodeName == 'PortfolioTransfer') {
        const sequenceName = `ACC_IMPL.PORTFOLIO_TRANSFER_SAT`;
        const template = `ПП-%06d`;
        return {
            'sequenceName': sequenceName,
            'template': template,
        };
    }

    if (configurationCodeName == 'AgentVerification') {
        const sequenceName = 'ACC_IMPL.AGENT_VERIFICATION';
        const template = 'ПРОВЕРКА-%010d';
        return {
            'sequenceName': sequenceName,
            'template': template,
        };
    }

    // default numbering
    return {
        "sequenceName": "PAS.CONTRACT",
        "template": "%d"
    };

};
