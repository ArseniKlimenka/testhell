'use strict';

module.exports = function mapping( { number, body} ) {

    const result = {};

    result['PAS_IMPL.CP_IMPORT_TEMPLATE_HUB'] = [{
        TEMPLATE_NUMBER: number
    }];

    result['PAS_IMPL.CP_IMPORT_TEMPLATE_SAT'] = [{
        TEMPLATE_NUMBER: number,
        FILE_ID: body.file.fileId,
        FILE_NAME: body.file.fileName,
        PARTNER_CODE: body.partner.partnerCode,
        PRODUCT_CODE: body.insuranceProduct.productCode,
        WITH_TARIFICATION: body.withTarification,
        CREATED: body.created,
        CREATED_BY: body.createdBy,
        CONFIRMED: body.confirmed,
        CONFIRMED_BY: body.confirmedBy
    }];

    return result;
};
