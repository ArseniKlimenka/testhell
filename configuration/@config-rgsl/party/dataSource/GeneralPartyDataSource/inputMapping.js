'use strict';

const { Exception } = require("handlebars");

module.exports = function (input) {

    const criteria = input.data.criteria;
    const userRoles = this.applicationContext.user.applicationRoles;
    const isSMGO = userRoles.some(x => x == 'SMGO');
    const pageSize = input?.paging?.pageSize;
    if (!isSMGO) {
        if (!pageSize) {
            throw new Exception('Необходимо указать количество возвращаемых записей на странице!');
        }
        if (pageSize > 15) {
            throw new Exception('Превышено количество возвращаемых записей!');
        }
    }

    const isWTTJ = userRoles.some(x => x == 'WTTJ');
    if (!isWTTJ && (!criteria.partyIdsToInclude || criteria.partyIdsToInclude.length === 0)) {
        if ((criteria.partyCodesToInclude?.length ?? 0) !== 0) {
            throw new Exception('Поиск по коду запрещён!');
        }

        if (!criteria.docTypeCode || !criteria.docSeries || !criteria.docNumber) {
            if (!criteria.partyType) {
                throw new Exception('Необходимо указать Тип!');
            }
            else if (criteria.partyType == 'NaturalPerson') {
                const errorsToShow = [];
                if (!criteria.lastName) {
                    errorsToShow.push('Фамилия');
                }
                if (!criteria.firstName) {
                    errorsToShow.push('Имя');
                }
                if (!criteria.dateOfBirth) {
                    errorsToShow.push('Дата рождения');
                }
                if (errorsToShow.length > 0) {
                    const errorsToShowJoint = errorsToShow.join(', ');
                    throw `Необходимо указать: ${errorsToShowJoint}!`;
                }
            }
        }
    }

    const searchRequest = {
        query: {
            bool: {
                must: [],
                should: [],
                mustNot: []
            }
        },
        sort: []
    };

    if (criteria.freeText) {
        searchRequest.query.bool.must.push({
            prefix: criteria.freeText
        });
    }

    if (criteria.createdOnFrom) {
        searchRequest.query.bool.must.push({
            range: {
                'metadata.createdOn': {
                    'gte': criteria.createdOnFrom
                }
            }
        });
    }

    if (criteria.partyType) {
        searchRequest.query.bool.must.push({
            match: {
                'metadata.configuration.name': criteria.partyType
            }
        });
    }

    if (criteria.code) {
        searchRequest.query.bool.must.push({
            match: {
                'code': criteria.code
            }
        });
    }

    if (criteria.id) {
        searchRequest.query.bool.must.push({
            match: {
                'id': criteria.id
            }
        });
    }

    if (criteria.partyIdsToInclude && criteria.partyIdsToInclude.length > 0) {

        searchRequest.query.bool.must.push({
            terms: {
                'id': criteria.partyIdsToInclude
            }
        });
    }

    if (criteria.partyCodes && criteria.partyCodes.length > 0) {

        searchRequest.query.bool.must.push({
            terms: {
                'code': criteria.partyCodes
            }
        });
    }

    if (criteria.partyCodesToInclude && criteria.partyCodesToInclude.length > 0) {

        searchRequest.query.bool.must.push({
            terms: {
                'code': criteria.partyCodesToInclude
            }
        });
    }

    if (criteria.partyCodesToExclude && criteria.partyCodesToExclude.length > 0) {

        searchRequest.query.bool.must.push({

            bool: {
                mustNot: [{
                    terms: {
                        'code': criteria.partyCodesToExclude
                    }
                }]
            }
        });
    }

    if (criteria.showDuplicates) {
        searchRequest.query.bool.must.push({
            bool: {
                must: [{
                    exists: {
                        field: 'body.duplicateMasterNumber'
                    }
                }]
            }
        });
    } else {
        searchRequest.query.bool.must.push({
            bool: {
                mustNot: [{
                    exists: {
                        field: 'body.duplicateMasterNumber'
                    }
                }]
            }
        });
    }

    if (criteria.dateOfBirthFrom) {

        searchRequest.query.bool.must.push({
            range: {
                'body.dateOfBirth': {
                    'gte': criteria.dateOfBirthFrom
                }
            }
        });
    }

    if (criteria.dateOfBirthTo) {

        searchRequest.query.bool.must.push({
            range: {
                'body.dateOfBirth': {
                    'lte': criteria.dateOfBirthTo
                }
            }
        });
    }

    // NaturalPerson || SoleProprietor
    if (criteria.partyType === 'NaturalPerson' || criteria.partyType === 'SoleProprietor') {

        if (criteria.lastName) {
            searchRequest.query.bool.must.push({
                match: {
                    'body.lastName': criteria.lastName
                }
            });
        }

        if (criteria.firstName) {
            searchRequest.query.bool.must.push({
                match: {
                    'body.firstName': criteria.firstName
                }
            });
        }

        if (criteria.middleName) {
            searchRequest.query.bool.must.push({
                match: {
                    'body.middleName': criteria.middleName
                }
            });
        }

        if (criteria.personGender) {
            searchRequest.query.bool.must.push({
                match: {
                    'body.personGender': criteria.personGender
                }
            });
        }

        if (criteria.dateOfBirth) {
            searchRequest.query.bool.must.push({
                range: {
                    'body.dateOfBirth': {
                        'gte': criteria.dateOfBirth,
                        'lte': criteria.dateOfBirth
                    }
                }
            });
        }

        if (criteria.docTypeCode) {
            searchRequest.query.bool.must.push({
                prefix: {
                    'body.identityDocuments.identityDocumentType': criteria.docTypeCode
                }
            });
        }

        if (criteria.docSeries) {
            searchRequest.query.bool.must.push({
                prefix: {
                    'body.identityDocuments.documentSeries': criteria.docSeries
                }
            });
        }

        if (criteria.docNumber) {
            searchRequest.query.bool.must.push({
                prefix: {
                    'body.identityDocuments.documentNumber': criteria.docNumber
                }
            });
        }

    }

    // LegalEntity
    if (criteria.partyType === 'LegalEntity') {

        if (criteria.OGRNOGRNIP) {
            searchRequest.query.bool.must.push({
                prefix: {
                    'body.OGRNOGRNIP': criteria.OGRNOGRNIP
                }
            });
        }
        if (criteria.fullName) {
            searchRequest.query.bool.must.push({
                prefix: {
                    'body.fullName': criteria.fullName
                }
            });
        }

    }

    if (input.data.sort) {
        searchRequest.sort = input.data.sort.map((element) => {
            const sortInfo = {};
            sortInfo[element.fieldName] = element.descending ? 'desc' : 'asc';
            return sortInfo;
        });
    }

    return searchRequest;

};
