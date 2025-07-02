'use strict';

function modifyInitiator(doc, serviceInput) {

    const originalData = {
        initiator: JSON.parse(JSON.stringify(doc.body.initiator))
    };

    doc.body.initiator = {
        userId: serviceInput.initiator.userId,
        userName: serviceInput.initiator.userName,
        partyCode: serviceInput.initiator.partyCode,
        partyFullName: serviceInput.initiator.partyFullName,
        employeeCode: serviceInput.initiator.employeeCode,
        organisationUnitCode: serviceInput.orgUnit.code,
        organisationUnitName: serviceInput.orgUnit.description
    };

    const modifiedData = {
        initiator: doc.body.initiator
    };

    doc.originalData = originalData;
    doc.modifiedData = modifiedData;
}

function modifyCurator(doc, serviceInput) {

    const originalData = {
        curator: JSON.parse(JSON.stringify(doc.body.curator))
    };

    doc.body.curator.description = serviceInput.curator;

    const modifiedData = {
        curator: doc.body.curator
    };

    doc.originalData = originalData;
    doc.modifiedData = modifiedData;
}

function modifyProductConfiguration(doc, serviceInput, productConfiguration) {

    const originalData = {
        productConfiguration: JSON.parse(JSON.stringify(doc.body.productConfiguration))
    };

    doc.body.productConfiguration = productConfiguration;

    const modifiedData = {
        productConfiguration: doc.body.productConfiguration
    };

    doc.originalData = originalData;
    doc.modifiedData = modifiedData;
}

const modificationTypes = {
    curator: "curator",
    initiator: "initiator",
    productConfiguration: "productConfiguration"
};

module.exports = {
    modifyInitiator, modifyCurator, modifyProductConfiguration, modificationTypes
};
