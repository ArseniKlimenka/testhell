const { productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function InlineViewVerificationHolderCreateParams(input) {

    return { 'master-entity-code': `${input.context.Body.policyHolderCode}` };
};
