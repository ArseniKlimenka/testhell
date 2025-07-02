'use strict';

const helper = require('@config-rgsl/agent-agreement-base/lib/AAASSHelper');

module.exports = function policyMapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}, sinkExchange) {

    const splitCommission = commonBody.attributes.splitCommission || [];
    const salesChannels = commonBody.salesChannels || [];
    const baseCommissionRules = commonBody.rules.filter(rule => rule.commissionType === 'base') || [];

    const ids = sinkExchange.sequences.find(r => r.sequenceName === 'PAS_IMPL.AA_EVAL_ATTR_VALUE').ids;
    const sequenceMap = helper.getSequenceMap(baseCommissionRules, ids);
    const evalAttrValues = helper.getValueSatellitesForRule(baseCommissionRules, sequenceMap);

    if (evalAttrValues && evalAttrValues.length > 0) {

        const unmappedValues = evalAttrValues.filter(value => !value.VALUE_REF_ID);

        if (unmappedValues && unmappedValues.length > 0) {

            throw 'Error during eval attr values ref generation!';
        }
    }

    const vatRates = [
        {
            $deleted: true,
            AA_NUMBER: number,
        }];

    if (commonBody.attributes.additionalAttributes.vatRates) {
        vatRates.push(...commonBody.attributes.additionalAttributes.vatRates.map(_ => {
            return {
                AA_NUMBER: number,
                START_DATE: _.startDate ?? '1900-01-01',
                VAT_RATE: _.vatRate,
            };
        }));
    }

    const result = {

        'PAS_IMPL.AA_HUB': [
            {
                AA_NUMBER: number
            }
        ],

        'PAS_IMPL.AA_BASE_SAT': [
            {
                AA_NUMBER: number,
                TITLE: commonBody.agreementName,
                AGENT: commonBody.attributes.participants.agent.serviceProviderCode,
                START_DATE: commonBody.validFrom,
                END_DATE: commonBody.validTo
            }
        ],

        'PAS_IMPL.AA_SAT': [
            {
                AA_NUMBER: number,
                MANUAL_NUMBER: commonBody.attributes.mainAttributes.manualDocumentNumber,
                EXTERNAL_NUMBER: commonBody.attributes.mainAttributes.externalDocumentNumber,
                CONCLUSION_DATE: commonBody.issueDate,
                RGS_CHANNEL_CODE: commonBody.attributes.mainAttributes.rgsChannel?.code,
                CB_AGENT_TYPE_CODE: commonBody.attributes.mainAttributes.cbAgentType?.code,
                CURRENCY_CODE: commonBody.attributes.mainAttributes.documentCurrency,
                AGENCY_CODE: commonBody.attributes.mainAttributes.agency?.code,
                ORDER_NUMBER: commonBody.attributes.mainAttributes.orderNumber,
                MVZ_NUMBER: commonBody.attributes.organisation.mvzNumber,
                SKK_NUMBER: commonBody.attributes.organisation.skkNumber,
                IS_PERSONAL_BUSINESS: commonBody.attributes.mainAttributes.isPersonalBusiness,
                USE_NDS: commonBody.attributes.additionalAttributes.useNds,
                IS_DOC_CORRECT: commonBody.attributes.additionalAttributes.isDocCorrect,
                IS_TECHNICAL: commonBody.attributes.mainAttributes.isTechnical ?? false,
                BUDGET_RULE_CODE: commonBody.attributes.budgetRule?.rule?.code,
                BUDGET_ALG_CODE: commonBody.attributes.budgetRule?.algorithm?.code,
                SALES_CLASSIFICATION: body.mainAttributes.salesClassification
            }
        ],

        'PAS_IMPL.AA_VAT_RATE_SAT': vatRates,

        'PAS_IMPL.AA_ORG_UNIT_LINK': [
            {
                AA_NUMBER: number,
                ORGANISATION_UNIT_CODE: commonBody.organisationUnit.code
            }
        ],

        'PAS_IMPL.AA_ORGANISATION_UNIT_SAT': [
            {
                AA_NUMBER: number,
                CODE: commonBody.organisationUnit.code
            }
        ],

        'PAS_IMPL.AA_PARTICIPANT_LINK': commonBody.participants.map(item => {

            return {
                AA_NUMBER: number,
                SERVICE_PROVIDER_CODE: item.code
            };
        }),

        'PAS_IMPL.AA_PARTICIPANT_SAT': commonBody.participants.map(item => {

            const index = splitCommission.findIndex(s => s.participant.code === item.code);

            return {
                AA_NUMBER: number,
                SERVICE_PROVIDER_CODE: item.code,
                NAME: item.fullName,
                ROLE: item.role,
                FIXED_COMMISSION: item.fixedCommission,
                FIXED_COMMISSION_FREQUENCY: item.fixedCommissionFrequency,
                FIXED_COMMISSION_VALID_FROM: item.fixedCommissionValidFrom,
                FIXED_COMMISSION_VALID_TO: item.fixedCommissionValidTo,
                CURRENCY: item.fixedCommissionCurrencyCode,
                SPLIT_COMMISSION_RATE: (index) ? splitCommission[index] && splitCommission[index].portionOfCommission : undefined,
                START_DATE: commonBody.validFrom,
                END_DATE: commonBody.validTo,
                BANK_ACCOUNT_NUMBER: commonBody.attributes.participants.agent.bankAccount?.number
            };
        }),

        'PAS_IMPL.AA_SALES_CHANNEL_SAT': salesChannels.map(code => {
            return {
                AA_NUMBER: number,
                CODE: code,
                START_DATE: commonBody.validFrom,
                END_DATE: commonBody.validTo
            };
        }),

        'PAS_IMPL.AA_EVAL_ATTR_VALUE': evalAttrValues,

        'PAS_IMPL.AA_BASE_COMM_SAT': baseCommissionRules.map(rule => helper.getSatelliteRecordForRule(number, sequenceMap, rule)),

        'PAS_IMPL.AA_COMM_TYPE_HUB': [
            {
                COMMISSION_TYPE: 'base'
            }
        ],

        'PAS_IMPL.AA_COMM_LINK': [
            {
                AA_NUMBER: number,
                COMMISSION_TYPE: 'base'
            }
        ],
    };

    helper.setAmendmentSatellites(result, commonBody, dimensions.agentAgreementType, originalDocumentNumber, number);

    return result;
};
