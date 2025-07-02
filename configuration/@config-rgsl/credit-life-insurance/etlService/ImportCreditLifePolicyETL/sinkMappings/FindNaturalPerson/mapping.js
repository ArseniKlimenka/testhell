const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");

module.exports = function mapping(lineInput) {

    return {
        input: {
            data: {
                criteria: {
                    partyType: 'NaturalPerson',
                    docTypeCode: 'passport',
                    docSeries: lineInput.data.docSeries,
                    docNumber: lineInput.data.docNumber,
                    dataSourceRequestId: guidHelper.generate()
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
