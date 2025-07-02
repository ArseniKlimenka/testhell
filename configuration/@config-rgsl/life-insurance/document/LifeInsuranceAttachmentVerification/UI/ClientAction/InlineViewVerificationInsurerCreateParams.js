module.exports = function InlineViewVerificationInsurerCreateParams(input, ambientProperties) {
    return { 'master-entity-code': input.context.Body.insuredPersonCode };
};
