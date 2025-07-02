const { convertFromUTCToBusinessTime } = require('@adinsure/runtime').businessClock;
const { substitutedUsers, user } = require('@adinsure/runtime');

module.exports = function (input) {
    const criteria = input.data.criteria;
    const searchRequest = {
        query: {
            bool: {
                must: [],
                mustNot: [],
                filter: [],
            }
        },
        sort: []
    };

    if (criteria.businessNumber) {
        searchRequest.query.bool.must.push({
            match: {
                'number': criteria.businessNumber
            }
        });
    }

    if (criteria.documentState) {
        searchRequest.query.bool.must.push({
            match: {
                'body.documentState': criteria.documentState
            }
        });
    }

    if (criteria.groupCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.userGroup.code': criteria.groupCode
            }
        });
    }

    if (criteria.assigneeId) {
        let users = [criteria.assigneeId];
        const substituteUsers = substitutedUsers.getSubstitutedUsers(criteria.assigneeId);
        if (substituteUsers && substituteUsers.length > 0) {
            users = users.concat(substituteUsers);
        }

        searchRequest.query.bool.must.push({
            terms: {
                'body.assignee.id': users
            }
        });
    }

    const deadLineRange = {};
    if (criteria.deadlineFrom) {
        deadLineRange.gte = convertFromUTCToBusinessTime(criteria.deadlineFrom);
    }

    if (criteria.deadlineTo) {
        deadLineRange.lte = convertFromUTCToBusinessTime(criteria.deadlineTo);
    }

    if (Object.keys(deadLineRange).length > 0) {
        searchRequest.query.bool.must.push({
            range: {
                'body.dueDate': deadLineRange
            }
        });
    }

    const closedOnRange = {};
    if (criteria.closedOnFrom) {
        closedOnRange.gte = criteria.closedOnFrom;
    }

    if (criteria.closedOnTo) {
        closedOnRange.lte = criteria.closedOnTo;
    }

    if (Object.keys(closedOnRange).length > 0) {
        searchRequest.query.bool.must.push({
            range: {
                'metadata.closedOn': closedOnRange
            }
        });
    }

    const createdOnRange = {};
    if (criteria.createdOnFrom) {
        createdOnRange.gte = criteria.createdOnFrom;
    }

    if (criteria.createdOnTo) {
        createdOnRange.lte = criteria.createdOnTo;
    }

    if (Object.keys(createdOnRange).length > 0) {
        searchRequest.query.bool.must.push({
            range: {
                'metadata.createdOn': createdOnRange
            }
        });
    }

    if (criteria.activityStatus) {
        searchRequest.query.bool.must.push({
            match: {
                'body.activityStatus': criteria.activityStatus
            }
        });
    }

    if (criteria.activityType) {
        searchRequest.query.bool.must.push({
            match: {
                'body.activityType': criteria.activityType
            }
        });
    }

    if (criteria.username && !criteria.groupCode) {
        const groups = user.getUserProfile(criteria.username).groups;
        if (groups && groups.length > 0) {
            searchRequest.query.bool.must.push({
                terms: {
                    'body.userGroup.code': groups.map(item => {
                        return item.code;
                    })
                }
            });
        }
    }

    if (criteria.hasAssigneeId !== undefined
        && !criteria.hasAssigneeId) {
        searchRequest.query.bool.mustNot.push({
            exists: {
                'field': 'body.assignee.id'
            }
        });
    }

    if (!criteria.noCriteria) {
        if (criteria.showVerification) {
            searchRequest.query.bool.must.push({
                exists: {
                    field: 'body.verificationData'
                }
            });
        } else {
            searchRequest.query.bool.mustNot.push({
                exists: {
                    field: 'body.verificationData'
                }
            });
        }
    }

    if (criteria.holderName) {
        searchRequest.query.bool.must.push({
            match: {
                'body.verificationData.extraData.holderName': criteria.holderName
            }
        });
    }

    const holderAgeRange = {};
    if (criteria.holderAgeFrom) {
        holderAgeRange.gte = criteria.holderAgeFrom;
    }

    if (criteria.holderAgeTo) {
        holderAgeRange.lte = criteria.holderAgeTo;
    }

    if (Object.keys(holderAgeRange).length > 0) {
        searchRequest.query.bool.must.push({
            range: {
                'body.verificationData.extraData.holderAge': holderAgeRange
            }
        });
    }


    if (criteria.insuredName) {
        searchRequest.query.bool.must.push({
            match: {
                'body.verificationData.body.insuredPersonFullName': criteria.insuredName
            }
        });
    }

    const contractNumber = criteria.contractNumber;
    if (contractNumber) {
        const contractNumbers = contractNumber.replaceAll('\n', ',').replaceAll(';', ',').split(',');
        searchRequest.query.bool.filter.push({
            terms: {
                'body.verificationData.body.number': contractNumbers
            }
        });
    }

    const issueDateRange = {};
    if (criteria.issueDateFrom) {
        issueDateRange.gte = criteria.issueDateFrom;
    }

    if (criteria.issueDateTo) {
        issueDateRange.lte = criteria.issueDateTo;
    }

    if (Object.keys(issueDateRange).length > 0) {
        searchRequest.query.bool.must.push({
            range: {
                'body.verificationData.extraData.issueDate': issueDateRange
            }
        });
    }

    if (criteria.paymentFrequency?.paymentFrequencyCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.verificationData.extraData.paymentFrequencyCode': criteria.paymentFrequency.paymentFrequencyCode
            }
        });
    }

    if (criteria.insuranceProduct?.productCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.verificationData.extraData.productCode': criteria.insuranceProduct.productCode
            }
        });
    }

    if (criteria.insuranceProducts?.length > 0) {
        const productCodes = criteria.insuranceProducts.map(x => x.productCode);
        searchRequest.query.bool.filter.push({
            terms: {
                'body.verificationData.extraData.productCode': productCodes
            }
        });
    }

    if (criteria.partner?.partnerCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.verificationData.extraData.partnerCode': criteria.partner?.partnerCode
            }
        });
    }

    if (criteria.attachmentVerificationState) {
        searchRequest.query.bool.must.push({
            match: {
                'body.verificationData.extraData.verificationState': criteria.attachmentVerificationState
            }
        });
    }

    if (criteria.showVerification && criteria.contractStates) {
        searchRequest.query.bool.must.push({
            terms: {
                'body.verificationData.extraData.contractState': criteria.contractStates
            }
        });
    }

    if (criteria.hideUnassignedTasks && criteria.showVerification) {
        searchRequest.query.bool.must.push({
            exists: {
                field: 'body.assignee'
            }
        });
    }

    if (input.data.sort) {
        searchRequest.sort = input.data.sort.map((element) => {
            const sortInfo = {};
            sortInfo[mapFieldName(element.fieldName)] = element.descending ? 'desc' : 'asc';
            return sortInfo;
        });
    }

    return searchRequest;
};

function mapFieldName(fieldName) {
    let mappedField;

    switch (fieldName) {
        case 'activityId':
            mappedField = 'id';
            break;
        case 'entityId':
            mappedField = 'body.entityReferenceId';
            break;
        case 'businessNumber':
            mappedField = 'number';
            break;
        case 'activityTypeDetails':
            mappedField = 'body.activityType';
            break;
        case 'assigneeId':
        case 'assigneeName':
            mappedField = 'body.assignee.username';
            break;
        case 'documentStateLocalized':
            mappedField = 'body.documentState';
            break;
        case 'createdDate':
            mappedField = 'metadata.createdOn';
            break;
        case 'createdBy':
            mappedField = 'metadata.createdBy.id';
            break;
        case 'closedDate':
            mappedField = 'metadata.closedOn';
            break;
        case 'closedBy':
            mappedField = 'metadata.closedBy.id';
            break;
        case 'groupCode':
            mappedField = 'body.verificationData.extraData.productCode';
            break;
        case 'priorityCode':
            mappedField = 'body.priority.code';
            break;
        case 'priorityWeight':
            mappedField = 'body.priority.weight';
            break;
        case 'contractState':
            mappedField = 'body.verificationData.extraData.contractState';
            break;
        case 'issueDate':
            mappedField = 'body.verificationData.extraData.issueDate';
            break;
        case 'holderName':
            mappedField = 'body.verificationData.extraData.holderName';
            break;
        case 'holderBirthDate':
            mappedField = 'body.verificationData.extraData.holderBirthDate';
            break;
        case 'paymentFrequencyCode':
        case 'paymentFrequencyName':
            mappedField = 'body.verificationData.extraData.paymentFrequencyCode';
            break;
        case 'productGroupCode':
        case 'productGroup':
            mappedField = 'body.verificationData.extraData.productGroupCode';
            break;
        case 'productCode':
        case 'productName':
            mappedField = 'body.verificationData.extraData.productCode';
            break;
        case 'partnerCode':
        case 'partnerName':
            mappedField = 'body.verificationData.extraData.partnerCode';
            break;
        case 'startDate':
            mappedField = 'body.verificationData.extraData.startDate';
            break;
        case 'endDate':
            mappedField = 'body.verificationData.extraData.endDate';
            break;
        case 'contractNumber':
            mappedField = 'body.verificationData.body.number';
            break;
        default:
            mappedField = 'body.' + fieldName;
            break;
    }

    return mappedField;
}
