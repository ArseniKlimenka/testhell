module.exports = function InlineViewVerificationPolicyCreateParams(input, ambientProperties) {
    return { 'document-number': input.context.Body.number };
};
