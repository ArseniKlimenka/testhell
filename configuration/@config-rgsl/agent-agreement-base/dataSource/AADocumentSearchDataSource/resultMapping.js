'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    let result = undefined;

    if (input) {

        const productCode = this.businessContext.data.criteria.productCode;
        const commissionRules = input.body.commissionRules || [];

        if (productCode) {

            const matchedRule = commissionRules.find(r => {

                if (!r.insuranceProduct) {

                    return true;
                }

                const isInverted = r.insuranceProduct.isInverted;
                let productCodes = r.insuranceProduct.values || [];
                productCodes = productCodes.map(p => p.code);

                if ((!isInverted && productCodes.includes(productCode)) || (isInverted && !productCodes.includes(productCode))) {

                    return true;
                }

                return false;
            });

            if (!matchedRule && commissionRules.length > 0) {

                return;
            }
        }


        const shortAgentOrgName = input.body?.participants?.agent?.shortOrgName;
        const agentFullName = input.body?.participants?.agent?.fullName;
        const agentSpCode = input.body?.participants?.agent?.serviceProviderCode;

        result = {
            id: input.id,
            documentCode: input.number,
            documentNumber: input.body.manualNumber ? input.body.manualNumber : input.number,
            manualNumber: input.body.manualNumber,
            externalNumber: input.body.externalNumber,
            agentName: agentFullName,
            agentNameShort: shortAgentOrgName ? shortAgentOrgName : agentFullName,
            agentCode: agentSpCode,
            startDate: input.body.startDate,
            endDate: input.body.endDate,
            conclusionDate: input.body.conclusionDate,
            documentState: translationUtils.getTranslation(`document/${input.metadata.configuration.name}/1`, 'states', null, input.stateCode),
            stateCode: input.stateCode,
            isDocCorrect: input.body.isDocCorrect,
            isTechnical: input.body.isTechnical,
            vatRates: input.body.attributes?.additionalAttributes?.vatRates,
            agentPersonalNumber: input.body.participants?.agent?.personalNumber,
            salesClassification: input.body.salesClassification,
            salesChannelName: input.body.salesChannel?.description,
            isPersonalBusiness: input.body.isPersonalBusiness,
            agentPartyType: translationUtils.getTranslation('dataSource/GeneralPartyDataSource/1', 'enum', 'PartyType', input.body.participants?.agent?.partyType ?? '', 'PartyType'),
            mvzNumber : input.body.attributes?.mainAttributes?.organisation?.mvzNumber,
            orderNumber: input.body.attributes?.mainAttributes?.orderNumber,
            agency: input.body.attributes?.mainAttributes?.agency?.description?.replaceAll('""', '"'),
            cbAgentType: input.body.attributes?.mainAttributes?.cbAgentType?.description,
            websiteAddress: input.body.participants?.agent?.partyBody?.partyOrganisationData?.site?.websiteAddress,
            INNKIO: input.body.participants?.agent?.partyBody?.partyGeneralData?.INNKIO,
            SNILS: input.body.participants?.agent?.partyBody?.partyPersonData?.SNILS
        };
    }

    return result;
};
