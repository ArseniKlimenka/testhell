'use static';

module.exports = function mapping(input) {

    if (input.dimensions.amendmentType === 'Cancellation') {
        return {
            businessNumber: input.originalDocumentNumber,
            transition: {
                configurationName: input.originalDocument.configuration.name,
                transitionName: 'Activated_to_CancelledByAmendment',
                skipIfNotAvailable: true
            }
        };
    }
};
