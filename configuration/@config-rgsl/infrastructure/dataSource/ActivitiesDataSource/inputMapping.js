const { convertFromUTCToBusinessTime } = require('@adinsure/runtime').businessClock;
const { substitutedUsers } = require('@adinsure/runtime');

module.exports = function (input) {
    const criteria = input.data.criteria;
    const output = {
        parameters: {
            entityId: criteria.entityId,
            userId: criteria.userId,
            businessNumber: null,
            businessNumbers: null,
            businessNumberStrict: criteria.businessNumberStrict,
            documentState: criteria.documentState,
            groupCode: criteria.groupCode,
            assigneeId: null,
            substitutedUsersIds: null,
            hasAssigneeId: null,
            doesNotHaveAssigneeId: null,
            deadlineFrom: null,
            deadlineTo: null,
            createdOnFrom: criteria.createdOnFrom,
            createdOnTo: criteria.createdOnTo,
            closedOnFrom: criteria.closedOnFrom,
            closedOnTo: criteria.closedOnTo,
            activityStatus: criteria.activityStatus,
            activityType: criteria.activityType,
            showVerification: criteria.showVerification,
            holderName: null,
            holderAgeFrom: criteria.holderAgeFrom,
            holderAgeTo: criteria.holderAgeTo,
            insuredName: null,
            contractNumber: null,
            contractNumbers: null,
            issueDateFrom: criteria.issueDateFrom,
            issueDateTo: criteria.issueDateTo,
            paymentFrequencyCode: criteria.paymentFrequency?.paymentFrequencyCode,
            productCode: criteria.insuranceProduct?.productCode,
            productCodes: criteria.insuranceProducts?.map(x => x.productCode),
            partnerCode: criteria.partner?.partnerCode,
            attachmentVerificationState: criteria.attachmentVerificationState,
            contractStates: criteria.contractStates,
            hideUnassignedTasks: input.data.criteria.hideUnassignedTasks,
            noCriteria: criteria.noCriteria,
        }
    };

    const businessNumber = criteria.businessNumber;
    if (businessNumber) {
        const formattedBusinessNumber = businessNumber.replaceAll('\n', ',').replaceAll(';', ',');
        if (formattedBusinessNumber.indexOf(',') > 0) {
            output.parameters.businessNumbers = formattedBusinessNumber.split(',');
        }
        else {
            output.parameters.businessNumber = criteria.businessNumber;
        }
    }

    if (criteria.assigneeId) {
        output.parameters.assigneeId = criteria.assigneeId;
        output.parameters.substitutedUsersIds = substitutedUsers.getSubstitutedUsers(criteria.assigneeId);
    }

    if (criteria.hasAssigneeId !== undefined) {
        if (criteria.hasAssigneeId) {
            output.parameters.hasAssigneeId = true;
        } else {
            output.parameters.doesNotHaveAssigneeId = true;
        }
    }

    if (criteria.deadlineFrom) {
        output.parameters.deadlineFrom = convertFromUTCToBusinessTime(criteria.deadlineFrom);
    }

    if (criteria.deadlineTo) {
        output.parameters.deadlineTo = convertFromUTCToBusinessTime(criteria.deadlineTo);
    }

    if (criteria.holderName) {
        output.parameters.holderName = '%' + criteria.holderName + '%';
    }

    if (criteria.insuredName) {
        output.parameters.insuredName = '%' + criteria.insuredName + '%';
    }

    const contractNumber = criteria.contractNumber;
    if (contractNumber) {
        const formattedContractNumber = contractNumber.replaceAll('\n', ',').replaceAll(';', ',');
        if (formattedContractNumber.indexOf(',') > 0) {
            output.parameters.contractNumbers = formattedContractNumber.split(',');
        }
        else {
            if (criteria.showVerification) {
                output.parameters.contractNumber = '%' + contractNumber + '%';
            } else {
                output.parameters.contractNumbers = contractNumber;
            }
        }
    }

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            activityId: 'ACTIVITY_ID',
            entityId: 'ENTITY_ID',
            businessNumber: 'BUSINESS_NUMBER',
            activityType: 'ACTIVITY_TYPE',
            activityStatus: 'ACTIVITY_STATUS',
            assigneeId: 'ASSIGNEE_ID',
            assigneeName: 'ASSIGNEE_NAME',
            createdDate: 'CREATED_ON',
            createdBy: 'CREATED_BY',
            closedDate: 'CLOSED_ON',
            closedBy: 'CLOSED_BY',
            groupCode: 'USER_GROUP_CODE',
            deadline: 'DEADLINE',
            documentState: 'DOCUMENT_STATE',
            priorityCode: 'PRIORITY_CODE',
            priorityWeight: 'PRIORITY_WEIGHT',
            effortCode: 'EFFORT_CODE',
            effortInMinutes: 'EFFORT_IN_MINUTES',
            comment: 'COMMENT',
            rank: 'RANK'
        };

        input.data.sort.forEach(element => {
            const dbName = columnNames[element.fieldName];

            if (dbName) {
                output.sort[dbName] = element.descending ? 'desc' : 'asc';
            }
        });
    }

    return output;
};
