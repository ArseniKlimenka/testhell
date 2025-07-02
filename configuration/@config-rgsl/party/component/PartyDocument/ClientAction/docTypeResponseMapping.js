'use strict';

module.exports = function docTypeResponseMapping(input, ambientProperties) {

    let output = [];

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');


    if (input.response && input.response.data && input.response.data.length > 0) {

        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.docTypeDesc.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });

    }
    else {
        output.push(input.context.docType);
    }

    if (!isBackOffice) {
        output = output.filter(elem => elem.allowToSalers);
    }

    output.sort((a, b) =>
        (a.docTypeCode == 'passport') ? -1 :
            (b.docTypeCode == 'passport') ? 1 :
                (a.docTypeCode == 'birthCertificate') ? -1 :
                    (b.docTypeCode == 'birthCertificate') ? 1 :
                        (a.docTypeCode == 'foreignTravelPassport') ? -1 :
                            (b.docTypeCode == 'foreignTravelPassport') ? 1 :
                                (a.docTypeCode == 'otherDocument') ? 1 :
                                    (b.docTypeCode == 'otherDocument') ? -1 :
                                        (a.docTypeDesc < b.docTypeDesc) ? -1 :
                                            (a.docTypeDesc > b.docTypeDesc) ? 1 :
                                                0
    );

    return output;

};
