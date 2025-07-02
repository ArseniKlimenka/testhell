module.exports = function evaluationContextMapping(input) {

    // TODO: ValidateKpkForEndowment must be removed after transition effect will be implemented for evaluationContext. This could be done in adinsure 46.
    const enrichments = [
        '[ValidateKpkForEndowment]',
    ];

    return {
        data: {},
        enrichFields: enrichments,
    };
};
