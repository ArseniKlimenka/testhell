const { expect } = require('chai');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { partyType, countryUSA, countryRussia, foreignPerson } = require('@config-rgsl/party/lib/partyConstantsImpl');

describe('Lib', function () {
    describe('partyValidationHelper', function () {
        testSNILSvalidation();
        testINNvalidation();
        testOGRNvalidation();
        testUsaSearchValidation();
        testForeignSearchValidation();
        testKPPValidationValidation();
    });

    function testSNILSvalidation() {
        const snilsGood = '816 574 489 38';
        const snilsBad = '123-456-789 10';

        describe('Testing the correct input SNILS', function () {
            expect(partyValidationHelper.snilsValidation(snilsGood)).to.equal(true, 'SNILS validation should pass');
        });

        describe('Testing the incorrect input SNILS', function () {
            expect(partyValidationHelper.snilsValidation(snilsBad)).to.equal(false, 'SNILS validation should fail');
        });
    }

    function testINNvalidation() {
        const innNaturalPersonGood = '502903876300';
        const innNaturalPersonBad = '502903876308';
        const innLegalEntityGood = '7736050003';
        const innLegalEntityBad = '7736050004';

        describe('Testing the correct input INN for NaturalPerson', function () {
            expect(partyValidationHelper.innValidation(innNaturalPersonGood, partyType.NaturalPerson))
                .to.equal(true, 'INN NaturalPerson validation should pass');
        });

        describe('Testing the incorrect input INN for NaturalPerson 2', function () {
            expect(partyValidationHelper.innValidation(innNaturalPersonBad, partyType.NaturalPerson))
                .to.equal(false, 'INN NaturalPerson validation should fail');
        });

        describe('Testing the incorrect input INN for NaturalPerson 3', function () {
            expect(partyValidationHelper.innValidation(innLegalEntityGood, partyType.NaturalPerson))
                .to.equal(false, 'INN NaturalPerson validation should fail');
        });

        describe('Testing the correct input INN for SoleProprietor', function () {
            expect(partyValidationHelper.innValidation(innNaturalPersonGood, partyType.SoleProprietor))
                .to.equal(true, 'INN SoleProprietor validation should pass');
        });

        describe('Testing the incorrect input INN for SoleProprietor', function () {
            expect(partyValidationHelper.innValidation(innNaturalPersonBad, partyType.SoleProprietor))
                .to.equal(false, 'INN SoleProprietor validation should fail');
        });

        describe('Testing the incorrect input INN for SoleProprietor 2', function () {
            expect(partyValidationHelper.innValidation(innLegalEntityGood, partyType.SoleProprietor))
                .to.equal(false, 'INN SoleProprietor validation should fail');
        });

        describe('Testing the correct input INN for LegalEntity', function () {
            expect(partyValidationHelper.innValidation(innLegalEntityGood, partyType.LegalEntity))
                .to.equal(true, 'INN LegalEntity validation should pass');
        });

        describe('Testing the incorrect input INN for LegalEntity', function () {
            expect(partyValidationHelper.innValidation(innLegalEntityBad, partyType.LegalEntity))
                .to.equal(false, 'INN LegalEntity validation should fail');
        });

        describe('Testing the incorrect input INN for LegalEntity 2', function () {
            expect(partyValidationHelper.innValidation(innNaturalPersonGood, partyType.LegalEntity))
                .to.equal(false, 'INN LegalEntity validation should fail');
        });
    }

    function testOGRNvalidation() {
        const ogrnipGood = '314505309900027';
        const ogrnipBad = '314505309900028';
        const ogrnGood = '1027700070518';
        const ogrnBad = '1027700070519';

        describe('Testing the correct input OGRNIP for NaturalPerson', function () {
            expect(partyValidationHelper.ogrnOgrnipValidation(ogrnipGood, partyType.NaturalPerson))
                .to.equal(true, 'OGRNIP validation should pass');
        });

        describe('Testing the incorrect input OGRNIP for NaturalPerson', function () {
            expect(partyValidationHelper.ogrnOgrnipValidation(ogrnipBad, partyType.NaturalPerson))
                .to.equal(false, 'OGRNIP validation should fail, OGRNIP incorrect');
        });

        describe('Testing the incorrect input OGRNIP for NaturalPerson 2', function () {
            expect(partyValidationHelper.ogrnOgrnipValidation(ogrnGood, partyType.NaturalPerson))
                .to.equal(false, 'OGRNIP validation should fail, OGRN correct');
        });

        describe('Testing the correct input OGRN for LegalEntity', function () {
            expect(partyValidationHelper.ogrnOgrnipValidation(ogrnGood, partyType.LegalEntity))
                .to.equal(true, 'OGRN validation should pass');
        });

        describe('Testing the incorrect input OGRN for LegalEntity', function () {
            expect(partyValidationHelper.ogrnOgrnipValidation(ogrnBad, partyType.LegalEntity))
                .to.equal(false, 'OGRN validation should fail, OGRN incorrect');
        });

        describe('Testing the incorrect input OGRN for LegalEntity 2', function () {
            expect(partyValidationHelper.ogrnOgrnipValidation(ogrnipGood, partyType.LegalEntity))
                .to.equal(false, 'OGRN validation should fail, OGRNIP correct');
        });
    }

    function testUsaSearchValidation() {

        const citizenshipWithUSA = [countryRussia, countryUSA];
        const citizenshipWitoutUSA = [countryRussia];

        describe('Testing the correct checking option of FATCA for NaturalPerson', function () {
            expect(partyValidationHelper.usaSearch(countryUSA, citizenshipWitoutUSA))
                .to.equal(true, 'UsaSearch validation should pass');
        });

        describe('Testing the correct checking option of FATCA for NaturalPerson 2', function () {
            expect(partyValidationHelper.usaSearch(countryRussia, citizenshipWithUSA))
                .to.equal(true, 'UsaSearch validation should pass');
        });

        describe('Testing the incorrect checking option of FATCA for NaturalPerson', function () {
            expect(partyValidationHelper.usaSearch(countryRussia, citizenshipWitoutUSA))
                .to.equal(false, 'UsaSearch validation should fail');
        });
    }

    function testForeignSearchValidation() {

        const citizenshipWithUSA = [countryRussia, countryUSA];
        const citizenshipWitoutUSA = [countryRussia];
        const foreignDocument = [{docType: {docTypeDesc: foreignPerson.foreignPassportDesc}}];
        const russiaDocument = [{docType: {docTypeDesc: foreignPerson.russiaPassportDesc}}];

        describe('Testing the correct checking option of CRS for NaturalPerson', function () {
            expect(partyValidationHelper.foreignSearch(countryUSA, citizenshipWitoutUSA, russiaDocument))
                .to.equal(true, 'foreignSearch validation should pass, bithCountry is USA');
        });

        describe('Testing the correct checking option of CRS for NaturalPerson 2', function () {
            expect(partyValidationHelper.foreignSearch(countryRussia, citizenshipWithUSA, russiaDocument))
                .to.equal(true, 'foreignSearch validation should pass, citezenships with USA');
        });

        describe('Testing the correct checking option of CRS for NaturalPerson 3', function () {
            expect(partyValidationHelper.foreignSearch(countryRussia, citizenshipWitoutUSA, foreignDocument))
                .to.equal(true, 'foreignSearch validation should pass, document type is foreign passport');
        });

        describe('Testing the incorrect checking option of CRS for NaturalPerson', function () {
            expect(partyValidationHelper.foreignSearch(countryRussia, citizenshipWitoutUSA, russiaDocument))
                .to.equal(false, 'foreignSearch validation should fail');
        });

    }

    function testKPPValidationValidation() {
        const kppGood = '772801001';
        const kppBad = '77280100';

        describe('Testing the correct input KPP', function () {
            expect(partyValidationHelper.kppValidation(kppGood))
                .to.equal(true, 'KPP validation should pass');
        });

        describe('Testing the incorrect input KPP', function () {
            expect(partyValidationHelper.kppValidation(kppBad))
                .to.equal(false, 'KPP validation should fail');
        });
    }

});
