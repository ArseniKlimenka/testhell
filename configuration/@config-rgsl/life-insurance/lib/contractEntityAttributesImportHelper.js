'use strict';

const attributeTypes = {
    originalReceiptDate: "OriginalReceiptDate",
    hasAmendment: "HasAmendment",
    paymentIntermediateApplication: "PaymentIntermediateApplication"
};

const contractEntityAttributesDataSources = [
    {
        "attributeType": attributeTypes.originalReceiptDate,
        "dataSourceName": "ContractEntityOriginalReceiptDateXlsxFileLoaderDataSource"
    },
    {
        "attributeType": attributeTypes.hasAmendment,
        "dataSourceName": "ContractEntityHasAmendmentXlsxFileLoaderDataSource"
    },
    {
        "attributeType": attributeTypes.paymentIntermediateApplication,
        "dataSourceName": "ContractEntityPaymentIntermediateApplicationXlsxFileLoaderDataSource"
    }
];

module.exports = {
    contractEntityAttributesDataSources,
    attributeTypes
};
