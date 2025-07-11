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
        };
    }

    return result;
};
