const { businessClock, translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {
    const output = {};
    output.activityId = input.id;
    output.entityId = input.body.entityReferenceId;
    output.businessNumber = input.number;
    output.activityType = input.body.activityType;
    output.activityStatus = input.body.activityStatus;
    output.activityStatusLocalized = translationUtils.getTranslation(
        'dataSource/ESActivitiesDataSource/1',
        'enum',
        'activityStatus',
        output.activityStatus,
        'ESActivitiesDataSourceInputSchema');
    output.manualActivityType = input.body.manualActivityType?.code ?? undefined;
    output.assigneeId = input.body.assignee?.id ?? undefined;
    output.assigneeName = input.body.assignee?.displayName ?? undefined;
    output.assigneeLogin = input.body.assignee?.username ?? undefined;
    output.createdDate = input.metadata.createdOn ?? undefined;
    output.createdBy = input.body.creationCausedBy?.displayName ?? undefined;
    output.closedDate = input.metadata.closedOn ?? undefined;
    output.closedBy = input.body.closingCausedBy?.displayName ?? undefined;
    output.groupCode = input.body.userGroup?.code ?? undefined;

    if (input.body.dueDate) {
        output.deadline = businessClock.convertFromBusinessTimeToUTC(input.body.dueDate);
    }

    output.documentState = input.body.documentState ?? undefined;
    output.priorityCode = input.body.priority?.code ?? undefined;
    output.priorityWeight = input.body.priority?.weight ?? undefined;
    output.effortCode = input.body.effortCode ?? undefined;
    output.effortInMinutes = input.body.effortInMinutes ?? undefined;
    output.comment = input.body.comment ?? undefined;
    output.entityStereotype = input.metadata.entityStereotype ?? undefined;

    output.documentStateLocalized = getDocumentStateLocalized(
        input.metadata.configuration.name,
        input.body.documentState);

    output.metadata = {
        entityType: input.metadata.entityType,
        businessNumber: input.number,
        configuration: {
            name: input.metadata.configuration.name,
            configurationVersion: input.metadata.configuration.version,
            state: input.body.documentState,
        }
    };

    const vd = input.body.verificationData;
    const cd = input.body.contractData;
    if (vd) {
        output.verificationState = vd.extraData.verificationState ?? undefined;
        output.partnerName = vd.extraData.partnerName ?? undefined;

        output.contractHolderName = vd.body.policyHolderFullName ?? undefined;
        output.contractInsuredName = vd.body.insuredPersonFullName ?? undefined;
        output.issueDate = vd.extraData.issueDate ?? undefined;
        output.startDate = vd.extraData.startDate ?? undefined;
        output.endDate = vd.extraData.endDate ?? undefined;
        output.paymentFrequencyName = vd.extraData.paymentFrequencyName ?? undefined;
        output.productCode = vd.extraData.productCode ?? undefined;
        output.productName = vd.extraData.productName ?? undefined;
        output.productGroupCode = vd.extraData.productGroupCode ?? undefined;
        if (vd.extraData.productGroupCode) {
            output.productGroup = translationUtils.getTranslation(
                'dataSource/GeneralContractSearchDataSource/1',
                'enum',
                'productGroup',
                output.productGroupCode,
                'ProductGroup');
        }
        output.contractState = vd.extraData.contractState ?? undefined;
        output.holderName = vd.extraData.holderName ?? undefined;
        output.holderAge = vd.extraData.holderAge ?? undefined;
        output.holderBirthDate = vd.extraData.holderBirthDate ?? undefined;
    }

    if (cd) {

        output.contractNumber = cd.number ?? undefined;
        output.contractConfCodeName = cd.configurationName ?? undefined;

        output.contractHolderName = cd.holderFullName ?? undefined;
        output.contractInsuredName = cd.insuredPersonFullName ?? undefined;
    }

    return output;
};

function getDocumentStateLocalized(configurationName, documentState) {
    let documentStateLocalized = null;

    if (documentState && configurationName) {
        documentStateLocalized = translationUtils.getTranslation(`document/${configurationName}/1`, 'states', null, documentState);
    }

    return documentStateLocalized || documentState;
}
