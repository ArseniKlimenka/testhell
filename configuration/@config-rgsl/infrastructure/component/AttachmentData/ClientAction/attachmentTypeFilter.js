'use strict';

const attachmentsViewConst = require("@config-rgsl/infrastructure/lib/AttachmentsViewConst");
const { documentConfiguration, typeOfRequest } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function attachmentTypeFilter(input, ambientProperties) {

    const isSystemActor = input.rootContext.WorkUnitActor.CurrentActor == 'System';
    const productCode = input.rootContext.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const issueFormCode = input.rootContext.Body?.issueForm?.code?.issueFormCode;
    const isPaper = issueFormCode == 'paper';

    let attachmentTypeItems = input.items;

    if (!isSystemActor && !isPaper) {
        attachmentTypeItems = attachmentTypeItems.filter(item => item.type != 'KIDAttachment' || item.type != 'servicesMemo');
        if (isWCENOAS) {
            attachmentTypeItems = attachmentTypeItems.filter(item => item.type != 'other');
        }
    }

    if (input.rootContext.ConfigurationCodeName == documentConfiguration.UniversalDocumentTypeValue) {
        if (input.rootContext.Body.typeOfRequest == typeOfRequest.Cancellation) {
            return attachmentTypeItems.filter(item => item.type != attachmentsViewConst.attachment.changeApplication);
        }
        if (input.rootContext.Body.typeOfRequest == typeOfRequest.Modification) {
            return attachmentTypeItems.filter(item => item.type != attachmentsViewConst.attachment.cancellationApplication);
        }
    }

    return attachmentTypeItems;

};
