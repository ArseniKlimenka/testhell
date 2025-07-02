const { businessClock, translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {
    const output = {};
    output.activityId = input.ACTIVITY_ID;
    output.entityId = input.ENTITY_ID;
    output.businessNumber = input.BUSINESS_NUMBER;
    output.entityCodeName = input.ENTITY_CODE_NAME;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.contractConfCodeName = input.CONTRACT_CONF_CODE_NAME;
    output.contractHolderName = input.CONTRACT_HOLDER_NAME;
    output.contractInsuredName = input.CONTRACT_INSURED_NAME;
    output.entityStereotype = input.CONCEPT_TYPE.replace('Configuration', '');
    output.activityType = input.ACTIVITY_TYPE;
    output.manualActivityType = input.MANUAL_ACTIVITY_TYPE;
    output.activityStatus = input.ACTIVITY_STATUS;
    output.activityStatusLocalized = translationUtils.getTranslation(
        'dataSource/ActivitiesDataSource/1',
        'enum',
        'activityStatus',
        output.activityStatus,
        'ActivitiesDataSourceInputSchema');
    output.assigneeId = input.ASSIGNEE_ID;
    output.assigneeName = input.ASSIGNEE_NAME;
    output.createdDate = businessClock.convertFromBusinessTimeToUTC(input.CREATED_ON);
    output.createdBy = input.CREATED_BY;
    output.closedDate = businessClock.convertFromBusinessTimeToUTC(input.CLOSED_ON);
    output.closedBy = input.CLOSED_BY;
    output.groupCode = input.USER_GROUP_CODE;
    output.deadline = businessClock.convertFromBusinessTimeToUTC(input.DEADLINE);
    output.documentState = input.DOCUMENT_STATE;
    output.priorityCode = input.PRIORITY_CODE;
    output.priorityWeight = input.PRIORITY_WEIGHT;
    output.effortCode = input.EFFORT_CODE;
    output.effortInMinutes = input.EFFORT_IN_MINUTES;
    output.comment = input.COMMENT;

    if (this.businessContext.data.criteria.showVerification) {

        output.partnerName = input.partner_name;

        output.issueDate = input.issue_date;
        output.startDate = input.start_date;
        output.endDate = input.end_date;
        output.paymentFrequencyName = input.payment_frequency_name;
        output.productCode = input.product_code;
        output.productName = input.product_name;
        output.productGroupCode = input.product_group_code;
        output.productGroup = translationUtils.getTranslation(
            'dataSource/GeneralContractSearchDataSource/1',
            'enum',
            'productGroup',
            output.productGroupCode,
            'ProductGroup');
        output.contractState = getContractStateLocalized(input.contract_state, input.CONTRACT_CONF_CODE_NAME);
        output.holderName = input.holder_name;
        output.holderAge = input.holder_age;
        output.holderBirthDate = input.holder_birth_date;
    }

    const summary = JSON.parse(input.SUMMARY);

    output.documentStateLocalized = getDocumentStateLocalized(summary, input.DOCUMENT_STATE);

    output.metadata = summary || {};
    output.metadata['versionable'] = input.VERSIONABLE;

    return output;
};

function getDocumentStateLocalized(entitySummary, documentState) {
    let documentStateLocalized = null;

    if (documentState && entitySummary.configuration && entitySummary.configuration.name) {
        documentStateLocalized = translationUtils.getTranslation(`document/${entitySummary.configuration.name}/1`, 'states', null, documentState);
    }

    return documentStateLocalized || documentState;
}

function getContractStateLocalized(contractState, contractConfCodeName) {
    return translationUtils.getTranslation(`document/${contractConfCodeName}/1`, 'states', null, contractState);
}
