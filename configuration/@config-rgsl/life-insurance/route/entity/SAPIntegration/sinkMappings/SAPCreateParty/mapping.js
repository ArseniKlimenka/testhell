'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { LocalDate } = require('@js-joda/core');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mappingFunction(input) {

    const { body, commonBody } = input;
    const currentDate = DateTimeUtils.formatDate(LocalDate.now(), 'dd.MM.yyyy');

    const partyPersonData = getValue(body, 'policyHolder.partyData.partyBody.partyPersonData');
    const adresses = getValue(body, 'policyHolder.partyData.partyBody.partyAddresses');
    const registrationAddress = adresses && adresses.find( a => a.addressType.addressTypeCode == 'R');
    const partyDocuments = getValue(body, 'policyHolder.partyData.partyBody.partyDocuments');
    const partyDocument = partyDocuments && partyDocuments.length > 0 && partyDocuments[0];

    const Begdat = currentDate;
    const Vorname = getValue(partyPersonData, 'firstName');
    const Partnn1 = getValue(partyPersonData, 'middleName');
    const Partnn2 = getValue(partyPersonData, 'lastName');
    const Geburtd = DateTimeUtils.formatDate(getValue(partyPersonData, 'dateOfBirth'), 'dd.MM.yyyy');

    const IConfigId = 'DEFAULT';
    const IEventid = 'DEFAULT';

    const Anredec = "001"; // Mr or Mrs
    const Geschlk = "2"; // body.policyHolder.partyData.partyBody.partyPersonData.personGender
    const Rollenc = "001"; // Role 001 = PolicyHolder
    const Geburtl = getValue(partyPersonData, '.countryPlace.alfa3');
    const ZzBirthplace = getValue(partyPersonData, 'birthPlace');
    const ZzNInn = getValue(body, 'policyHolder.partyData.partyBody.partyGeneralData.INNKIO');
    const ZzIssueDate = getValue(partyDocument, 'issueDate');
    const ZzIssuer = getValue(partyDocument, 'issuerName');
    const ZzIssuer2 = getValue(partyDocument, 'issuerCode');
    const ZzNumber = getValue(partyDocument, 'docNumber');
    const Exteric = "001"; // pasport
    const Externc = getValue(partyDocument, 'docSeries');
    const Zzofficialtx = "0";
    const ZzBowherType = "01";
    const KommuntAddress = "002"; // registration address
    const KommuntPhone = "007"; // mobile
    const Land1 = getValue(registrationAddress, 'fullAddress.data.country_iso_code');
    const Postlei = getValue(registrationAddress, 'postalCode');
    const Strasn1 = getValue(registrationAddress, 'street');
    const Hausnr = getValue(registrationAddress, 'house');
    const Ortname = getValue(registrationAddress, 'city');
    const Tuer = getValue(registrationAddress, 'flat');
    const Stndflg = "X";
    const Conmain = getValue(registrationAddress, 'fullNumber');

    return {
        request: {
            IConfigId: IConfigId,
            IEventid: IEventid,
            IsPars: {
                Partnen: "",
                Begdat: Begdat,
                Rechtpk: "1",
                Vorname: Vorname,
                Partnn1: Partnn1,
                Partnn2: Partnn2,
                Natioid: "",
                Pargebn: "",
                Geburtd: Geburtd,
                Anredec: Anredec,
                Geschlk: Geschlk,
                Rollenc: Rollenc,
                Enddat: "",
                Familic: "",
                Kommunt: "",
                Betriea: "",
                Berufco: "",
                Sterbed: "",
                Stcd1: "",
                Stcd2: "",
                Algansy: "",
                Sprachc: "",
                Geburtl: Geburtl,
                Geburto: "",
                Crsreqd: "",
                Crsrecd: "",
                Crsuack: "",
                Crslecl: "",
                Crstaxk: "",
                Fatreqd: "",
                Fatrecd: "",
                Fatuack: "",
                Fatlecl: "",
                Fattaxk: "2",
                Land1: "",
                Zzland1: "",
                ZzBirthplace: ZzBirthplace,
                ZzNInn: ZzNInn,
                ZzNameGenitiv: "",
                ZzOkonx: "",
                ZzKpp: "",
                ZzOkpo: "",
                ZzOgrn: "",
                Zzextpid: "",
                ZzPartnn1eng: "",
                ZzPartnn2eng: "",
                ZzVornameEng: "",
                Zztnum: "",
                Zzgrpbsns: "",
                Zzsibehcl: "",
                ZzsibehclEng: "",
                Zzsibehclsh: "",
                ZzsibehclshEng: "",
                Zzactingunder: "",
                ZzactunderEng: "",
                Zzegripcode: "",
                Zzegripnumber: "",
                Zzegripdate: "",
                Zzsmsrecip: "",
                ZzIssueDate: ZzIssueDate,
                ZzIssuer: ZzIssuer,
                ZzIssuer2: ZzIssuer2,
                ZzNumber: ZzNumber,
                Exteric: Exteric,
                Externc: Externc,
                Zzaddress: "",
                ZzExtericOther: "",
                ZzMigrcard: "",
                ZzSitizenship: "",
                ZzParnBig: "",
                ZzParnBigEn: "",
                ZzOgrnd: "",
                Zzofficialst: "",
                Zzofficialtx: Zzofficialtx,
                Zzbenowner: "",
                Zzriskassess: "",
                Zzcustnum: "",
                Zzpurposer: "",
                Zzallrelat: "",
                Zzpurpfiecac: "",
                Zzfinsituat: "",
                Zzbusreput: "",
                Zzfundsour: "",
                Zzucsreg: "",
                Zzucsid: "",
                Zzmailrec: "",
                ZzBowherType: ZzBowherType,
                Zzresidpermit: ""
            },
            IsUserData: {
                ZexternUserId: "TEST_ADAKTA"
            },
            Isystem: "1",
            ItAzws: {
                item: {
                    Partnen: "",
                    Zahluar: "",
                    Rollenc: "",
                    Zahlstc: ""
                }
            },
            ItBnks: {
                item: {
                    Partnen: "",
                    Rollenc: "",
                    Banks: "",
                    Bankkon: "",
                    Bankl: "",
                    Bkont: "",
                    Bkref: "",
                    Iban: "",
                    ValidFrom: "",
                    FlgNoAccno: "",
                    Zzrs: "",
                    Zzaccountno: ""
                }
            },
            ItPrls: {
                item: {
                    Partnen: "",
                    Rollenc: "",
                    Land1: ""
                }
            },
            ItRfcContactPerson: {
                item: {
                    Partnen: "",
                    Rollenc: "",
                    Kontpnr: "",
                    Kontapn: "",
                    Ortbesc: "",
                    Geraetn: ""
                }
            },
            ItRfcPartnerAddress: {
                item: [
                    {
                        Partnen: "",
                        Adressn: "",
                        Rollenc: Rollenc,
                        Begdat: "",
                        Kommunt: KommuntAddress,
                        Stndflg: "",
                        Land1: Land1,
                        Postlei: Postlei,
                        Strasn1: Strasn1,
                        Hausnr: Hausnr,
                        Ortname: Ortname,
                        Postfan: "",
                        Kreisco: "",
                        Gebaudn: "",
                        Tuer: Tuer,
                        Zzcity2: "",
                        ZzaddressEn: "",
                        Etagenr: "",
                        ZzRegCode: "",
                        ZzRegLt: "",
                        ZzAreaCode: "",
                        ZzAreaLt: "",
                        ZzLand1: "",
                        ZzRegionLat: "",
                        ZzAreaLat: "",
                        ZzOrtname: "",
                        ZzGebaudn: "",
                        ZzStrasn1: "",
                        ZzDistrict: "",
                        ZzDistrictLat: ""
                    }
                ]
            },
            ItRfcPartnerCommunication: {
                item: [
                    {
                        Partnen: "",
                        Kommunt: KommuntPhone,
                        Rollenc: Rollenc,
                        Stndflg: Stndflg,
                        Land1: Land1,
                        Conmain: Conmain,
                        Conext: "",
                        Email: "",
                        Prcntry: ""
                    }
                ]
            },
            ItRfcRoleExternalId: {
                item: {
                    Partnen: "",
                    Rollenc: "",
                    Exteric: "",
                    Externc: "",
                    ZzIssueDate: "",
                    ZzIssuer: "",
                    ZzNumber: "",
                    Kxterib: ""
                }
            },
            Ivermvnr: "",
            IwithoutSave: "0"
        }
    };
};
