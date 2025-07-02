const { translationUtils } = require('@adinsure/runtime');
const { providerConstants } = require('@config-rgsl/acc-base/lib/attributeConsts');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function resultMapping(input) {
    const partyConf = input.PARTY_CONFIGURATION;
    const aaIsPersonalBusiness = input.AA_IS_PERSONAL_BUSINESS;

    return {
        actId: input.ACT_ID,
        actNo: input.ACT_NO,
        eTag: input.ETAG,
        actIssueDate: input.ISSUE_DATE,
        aaNumber: input.AGENT_AGREEMENT_NUMBER,
        aaPartyType: getAgentPartyType(input.PROVIDER_CONFIGURATION, input.PARTNER_TYPE, partyConf, input.NATURAL_PERSON_CATEGORY, aaIsPersonalBusiness),
        premiumAmount: input.PREMIUM_AMOUNT_LC,
        commissionAmount: input.COMM_AMOUNT_LC,
        aaServiceProviderName: input.AGENT_FULL_NAME ? input.AGENT_FULL_NAME : '',
        actStateCode: input.STATE_CODE,
        reportingPeriodFrom: input.REPORTING_PERIOD_FROM,
        reportingPeriodTo: input.REPORTING_PERIOD_TO,
        vatAmount: input.VAT_AMOUNT_LC,
        actPayDate: input.PAY_DATE,
        attrMVZ: input.ATTR_MVZ,
        attrOrder: input.ATTR_ORDER,
        aaExternalNumber: input.AA_EXTERNAL_NUMBER,
        aaCbAgentType: input.AA_AT_DESCRIPTION,
        originalReceiptDate: input.ORIGINAL_RECEIPT_DATE,
        username: input.USERNAME,
        createdDate: input.CREATE_DATE,
        lastUpdated: input.LAST_UPDATED,
        notes: input.NOTES,
    };
};

function getAgentPartyType(providerConf, partnerType, partyConf, personCat, aaIsPersonalBusiness) {
    const partyConfTr = partyConf ? translationUtils.getTranslation('dataSource/GeneralPartyDataSource/1', 'enum', 'PartyType', partyConf.toString(), 'PartyType') : '';
    const personCatTr = personCat ? translationUtils.getTranslation('masterEntity/NaturalPerson/1', 'enum', 'naturalPersonCategory', personCat.toString(), 'PartyPersonData') : '';

    if (partnerType == 'broker') {
        return 'Брокер';
    }

    if (aaIsPersonalBusiness) {
        return 'ИП';
    }

    return personCat ? personCatTr : partyConfTr;
}
