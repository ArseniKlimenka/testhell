'use strict';

/**
 * @translationKey {translationKey} SoleProprietor
 */

module.exports = function agentAgreementPartyTypeMapping(input, ambientProperties) {
    const isPersonalBusiness = input.data.resultData.isPersonalBusiness;
    const translate = ambientProperties.services.translate.getSync;

    if (isPersonalBusiness) {
        return translate(ambientProperties.configurationCodeName.toUpperCase(), 'SoleProprietor');
    }

    return input.data.resultData.agentPartyType;
};
