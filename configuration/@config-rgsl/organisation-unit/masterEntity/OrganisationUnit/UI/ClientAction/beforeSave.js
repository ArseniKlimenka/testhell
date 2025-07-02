'use strict';

const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function beforeSave(input, ambientProperties) {

    if (!input.context.Code) {
        input.context.Code = guidHelper.generate();
    }

    const code = input.context.Body.code;
    const parentCode = input.context.Body.parentCode;
    const partnerCode = input.context.Body.partnerCode;
    const orgUnitCode = input.context.Code;

    if (code) {

        const orgUnitRequest = {
            method: 'post',
            url: `api/organisation/organisation-units/${ambientProperties.configurationCodeName}/evaluation`,
            data: {
                Data: {
                    code: code,
                    parentCode: parentCode,
                    partnerCode: partnerCode,
                    orgUnitCode: orgUnitCode
                },
                EnrichFields: [`[CheckDuplicateOrgCodeByPartnerEnrichment]`]
            },
            returnHttpPromise: true
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(orgUnitRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

    }

};
