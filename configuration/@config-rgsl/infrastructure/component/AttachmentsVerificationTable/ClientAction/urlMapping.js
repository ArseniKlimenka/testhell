module.exports = function urlMapping(input) {

    const { data } = input;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'UniversalDocument',
                configurationCodeName: 'LifeInsuranceAttachmentVerification',
                version: 1,
                documentNumber: data.verificationDocumentNumber
            }
        }
    };
};
