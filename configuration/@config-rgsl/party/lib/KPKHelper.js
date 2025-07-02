const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');
const { getValue, addPrefixForEachPropertyName } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = {

    prepareGetContractsRequestData: function (data, document) {
        const BaseID = 'ADINSURE';
        const Group = '';

        const output = {};

        if (data) {

            const INN = getValue(data, 'partyGeneralData.INNKIO');
            const NonResident = getValue(data, 'partyGeneralData.isNonResident') ? 1 : 0;
            const partyEmails = getValue(data, 'partyEmails', []);
            const preferableEmails = partyEmails.filter(e => e.isPreferable);
            const Email = preferableEmails.length > 0 ? preferableEmails[0].email : (partyEmails.length > 0 ? partyEmails[0].email : undefined);
            const partyPhones = getValue(data, 'partyPhones', []);
            const preferablePhones = partyPhones.filter(p => p.isPreferable);
            const PhoneNumber = preferablePhones.length > 0 ? preferablePhones[0].fullNumberFormatted : (partyPhones.length > 0 ? partyPhones[0].fullNumberFormatted : undefined);
            const PhoneNumberWithoutCodes = preferablePhones.length > 0 ? preferablePhones[0].fullNumber : (partyPhones.length > 0 ? partyPhones[0].fullNumber : undefined);
            const partyBankAccounts = getValue(data, 'partyBankAccounts', []);
            const partyBankAccount = partyBankAccounts.length > 0 ? partyBankAccounts[partyBankAccounts.length - 1] : undefined;

            output.Contractor = {};

            if (data.partyOrganisationData) {

                const Name = getValue(data, 'partyOrganisationData.shortOrgName');
                const FullName = getValue(data, 'partyOrganisationData.fullOrgName');
                const KPP = getValue(data, 'partyOrganisationData.KPP');
                const OGRN = getValue(data, 'partyOrganisationData.partyOGRN.OGRNOGRNIP');

                output.Contractor.JuridicalSection = {};
                output.Contractor.JuridicalSection.Group = Group;
                if (Name) { output.Contractor.JuridicalSection.Name = Name; }
                if (FullName) { output.Contractor.JuridicalSection.FullName = FullName; }
                if (INN) { output.Contractor.JuridicalSection.INN = INN; }
                if (KPP) { output.Contractor.JuridicalSection.KPP = KPP; }
                if (OGRN) { output.Contractor.JuridicalSection.OGRN = OGRN; }

            }

            if (data.partyPersonData) {

                const Birthday = getValue(data, 'partyPersonData.dateOfBirth');
                const Name = getValue(data, 'partyPersonData.firstName');
                const Surname = getValue(data, 'partyPersonData.lastName');
                const MiddleName = getValue(data, 'partyPersonData.middleName');
                const Sex = getValue(data, 'partyPersonData.personGender') == 'Male' ? 'Мужской' : 'Женский';
                const citizenship = getValue(data, 'partyPersonData.citizenship', []);
                const Nationality = citizenship.length > 0 && citizenship[0].countryShortName || undefined;
                const partyDocuments = getValue(data, 'partyDocuments', []);
                const passports = partyDocuments.filter(doc => doc.docType.docTypeCode === 'passport');
                let latestPassport = passports.length > 0 && passports[0] || undefined;
                passports.forEach(function (pass) {
                    latestPassport = new Date(pass.issueDate) > new Date(latestPassport.issueDate) ? pass : latestPassport;
                });
                const BirthPlace = getValue(data, 'partyPersonData.birthPlace');
                const Entrepreneur = getValue(data, 'partyPersonData.naturalPersonCategory') == 'soleProprietor' ? 1 : 0;
                let SNILS = getValue(data, 'partyPersonData.SNILS');
                if (SNILS) { SNILS = SNILS.replace(/ /gi, '').replace(/-/gi, ''); }
                const PDL = getValue(data, 'partyPersonData.isPublicOfficial') ? 1 : 0;
                const PDLRelative = ((PDL == 1) && getValue(data, 'partyPersonData.executivePerson.executivePersonDesc') == 'Родственник ПДЛ') ? 1 : 0;
                const PDLRelativeDegree = (PDLRelative == 1) && getValue(data, 'partyPersonData.relationType');
                const IPDL = ((PDL == 1) && getValue(data, 'partyPersonData.executivePerson.executivePersonDesc') == 'Иностранное ПДЛ') ? 1 : 0;

                output.Contractor.PhisicalSection = {};
                output.Contractor.PhisicalSection.Group = Group;
                if (document.fullName) { output.Contractor.PhisicalSection.FullName = document.fullName; }
                if (Birthday) { output.Contractor.PhisicalSection.Birthday = Birthday; }
                if (Name) { output.Contractor.PhisicalSection.Name = Name; }
                if (Surname) { output.Contractor.PhisicalSection.Surname = Surname; }
                if (MiddleName) { output.Contractor.PhisicalSection.MiddleName = MiddleName; }
                if (Sex) { output.Contractor.PhisicalSection.Sex = Sex; }
                if (Nationality) { output.Contractor.PhisicalSection.Nationality = Nationality; }
                if (latestPassport) {
                    output.Contractor.PhisicalSection.Passport = {
                        Series: latestPassport.docSeries,
                        Number: latestPassport.docNumber,
                        GivedOut: latestPassport.issuerName,
                        DateOfIssue: latestPassport.issueDate,
                        DocumentType: 'ПаспортРФ'
                    };
                }
                if (BirthPlace) { output.Contractor.PhisicalSection.BirthPlace = BirthPlace; }
                if (INN) { output.Contractor.PhisicalSection.INN = INN; }
                output.Contractor.PhisicalSection.Entrepreneur = Entrepreneur;
                if (SNILS) { output.Contractor.PhisicalSection.SNILS = SNILS; }
                output.Contractor.PhisicalSection.PDL = PDL;
                output.Contractor.PhisicalSection.PDLRelative = PDLRelative;
                if (PDLRelative == 1 && PDLRelativeDegree) { output.Contractor.PhisicalSection.PDLRelativeDegree = PDLRelativeDegree; }
                output.Contractor.PhisicalSection.IPDL = IPDL;

            }

            output.Contractor.NonResident = NonResident;

            if (Email) {
                if (!output.Contractor.Contacts) { output.Contractor.Contacts = {}; }
                output.Contractor.Contacts.Email = Email;
            }

            if (PhoneNumber || PhoneNumberWithoutCodes) {
                if (!output.Contractor.Contacts) { output.Contractor.Contacts = {}; }
                if (PhoneNumber) { output.Contractor.Contacts.PhoneNumber = PhoneNumber; }
                if (PhoneNumberWithoutCodes) { output.Contractor.Contacts.PhoneNumberWithoutCodes = PhoneNumberWithoutCodes; }
            }

            output.Contractor.OuterID = document.partyId;
            output.Contractor.Role = document.role;

            if (partyBankAccount) {
                output.Contractor.BankAccount = {};
                if (partyBankAccount.bankName) { output.Contractor.BankAccount.Name = partyBankAccount.bankName; }
                if (partyBankAccount.currency && partyBankAccount.currency.currencyCode) { output.Contractor.BankAccount.Currency = partyBankAccount.currency.currencyCode; }
                if (partyBankAccount.number) { output.Contractor.BankAccount.AccountNumber = partyBankAccount.number; }
                output.Contractor.BankAccount.Bank = {};
                if (partyBankAccount.SWIFT) { output.Contractor.BankAccount.Bank.SWIFTBIK = partyBankAccount.SWIFT; }
                if (partyBankAccount.bankBic) { output.Contractor.BankAccount.Bank.SWIFTBIK = partyBankAccount.bankBic; }
                if (partyBankAccount.bankName) { output.Contractor.BankAccount.Bank.Name = partyBankAccount.bankName; }
                if (partyBankAccount.bankCorrespondentAccount) { output.Contractor.BankAccount.Bank.CorrAccount = partyBankAccount.bankCorrespondentAccount; }
            }

            if (document.endDate) { output.Contractor.RelationshipEndDate = document.endDate; }
            if (document.issueDate) { output.Contractor.RelationshipBeginDate = document.issueDate; }

            if (document) {
                output.Document = {
                    DocumentUID: document.entityId,
                    DocumentNumber: document.DocumentNumber,
                    Representation: document.Representation,
                    TypeOperation: 'Приход',
                    Summ: 0,
                    CheckAgreement: 0,
                    BatchUpload: 0
                };
            }

            output.BaseID = BaseID;
        }

        return output;
    },

    getContractors: async function (data, ambientProperties, document) {

        const requestData = this.prepareGetContractsRequestData(data, document);

        const request = {
            method: 'post',
            url: `api/rgsl/party/KPK/GetContractors`,
            data: {
                data: requestData
            }
        };

        let result;
        try {
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }

        result.Reject = result.Reject == 'true';
        result.Error = result.Error == 'true';
        return result;

    },

    prepareCheckBlackListRequestData: function (data, document, userId, userName) {

        const isPartyNaturalPerson = Boolean(data.partyPersonData);

        const personName = getValue(data, 'partyPersonData.firstName');
        const personMiddleName = getValue(data, 'partyPersonData.middleName');
        const personSurname = getValue(data, 'partyPersonData.lastName');
        const personBirthday = getValue(data, 'partyPersonData.dateOfBirth');
        const personDocuments = getValue(data, 'partyDocuments', []);
        const personPassports = personDocuments.filter(doc => doc.docType.docTypeCode === 'passport');
        let personLatestPassport = personPassports.length > 0 && personPassports[0] || undefined;
        personPassports.forEach(function (pass) {
            personLatestPassport = new Date(pass.issueDate) > new Date(personLatestPassport.issueDate) ? pass : personLatestPassport;
        });
        const partyINN = getValue(data, 'partyGeneralData.INNKIO');
        const fullOrgName = getValue(data, 'partyOrganisationData.fullOrgName');

        let output = {
            Contractors: {
                PhysicalSection: undefined,
                JuridicalSection: undefined,
                Role: document.role,
                OuterID: document.partyId
            },
            Product: {
                ID: getValue(document, 'productCode', 'Иное'),
                Name: getValue(document, 'productDescription', 'Иное')
            },
            User: {
                ID: userId,
                Name: userName
            },
            RequestID: document.DocumentNumber || document.partyCode,
            BaseID: '',
            Comment: 'Обязательное поле',
            Info: 'Обязательное поле',
            DocumentNumber: document.DocumentNumber,
            Representation: document.Representation
        };

        // add prefix
        output = addPrefixForEachPropertyName(output, '_');

        if (isPartyNaturalPerson) {

            let physicalSection = {
                Surname: personSurname,
                Name: personName,
                SecondName: personMiddleName,
                DateOfBirth: personBirthday,
                DocSeria: personLatestPassport && personLatestPassport.docSeries,
                DosNumber: personLatestPassport && personLatestPassport.docNumber,
                INN: partyINN
            };

            // add prefix
            physicalSection = addPrefixForEachPropertyName(physicalSection, '__');
            output['_Contractors']['_PhysicalSection'] = physicalSection;
        } else {
            let juridicalSection = {
                Name: fullOrgName,
                INN: partyINN
            };

            // add prefix
            juridicalSection = addPrefixForEachPropertyName(juridicalSection, '__');
            output['_Contractors']['_JuridicalSection'] = juridicalSection;

        }

        return output;
    },

    checkBlackList: async function (data, ambientProperties, document) {

        if (!data) { return; }

        const userId = ambientProperties.applicationContext.currentUser().getUserId();
        const userName = ambientProperties.applicationContext.currentUser().getUserName();
        const requestData = this.prepareCheckBlackListRequestData(data, document, userId, userName);

        const request = {
            method: 'post',
            url: 'api/rgsl/party/KPK/CheckBlackList',
            data: {
                data: requestData
            }
        };

        let result;
        try {
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }

        result.Reject = result.Reject == 'true';
        result.Error = result.Error == 'true';
        return result;

    },

    setNaturalPersonPodFt: async function (party, ambientProperties) {

        if (!party || !party.partyCode || !party.partyType || party.partyType !== partyType.NaturalPerson) { return; }

        const request = {
            method: 'post',
            url: 'api/core/shared/integration-services/SetNaturalPersonPodFt/1',
            data: {
                data: {
                    partyCode: party.partyCode
                }
            }
        };

        await ambientProperties.services.api.call(request)
            .catch(error => {
                throw getValue(error, 'error.data.errorResponse.additionalErrorData.message', error.message);
            });
    },

    checkEmailBlackList: async function (party, ambientProperties) {

        let hasEmailBlackList = false;

        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/EmailBlackListDataSource',
            data: {
                data: {
                    criteria: {

                    }
                }
            }
        };

        for (const x of party.partyEmails) {
            request.data.data.criteria.email = x.email;

            const result = await ambientProperties.services.api.call(request);
            if (result && result.data && result.data.length > 0) {
                hasEmailBlackList = true;
            }
        }

        return hasEmailBlackList;
    }
};
