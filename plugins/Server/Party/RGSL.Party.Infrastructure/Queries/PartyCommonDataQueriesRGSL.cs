using Adacta.AdInsure.RGSL.Party.Domain.Queries;

namespace Adacta.AdInsure.RGSL.Party.Infrastructure.Queries
{
    public class PartyCommonDataQueriesRGSL : IPartyCommonDataQueriesRGSL
    {
        public string GetPartyAccountData()
        {
            return @"
SELECT pth.PARTY_CODE
      ,bs.BIC
      ,bs.BANK_ACCOUNT
      ,b.NAME BANK_NAME
FROM PTY_IMPL.PARTY_BANK_ACCOUNTS_SAT_LATEST bs
    JOIN PTY_IMPL.PARTY_HUB pth on pth.PARTY_HKEY = bs.PARTY_BANK_ACCOUNTS_HKEY
    JOIN ORG_IMPL.BANK b on b.BIC = bs.BIC
WHERE bs.IS_DELETED = 0
  and /**where**/
";
        }

        public string GetPartyAddressData()
        {
            return @"
select
	pt.PARTY_CODE,
	c.COUNTRY_CODE,
	b.OKATO,
	b.REGION_KLADR_ID,
	b.AREA_WITH_TYPE as AREA,
	coalesce(b.CITY, b.SETTLEMENT) + ' ' + coalesce(b.CITY_TYPE, b.SETTLEMENT_TYPE) as POINT,
	b.STREET_WITH_TYPE as STREET,
    b.STREET_TYPE as STREET_TYPE,
    b.STREET_NAME as STREET_NAME,
	b.HOUSE,
	b.BUILDING,
	b.FLAT
from pty.PARTY pt
	cross apply openjson(pt.BODY, '$.partyAddresses') 
	with
	(
		ADDRESS_TYPE_CODE nvarchar(256) '$.addressType.addressTypeCode',
		COUNTRY_ISO_CODE nvarchar(256) '$.fullAddress.data.country_iso_code',
		OKATO nvarchar(256) '$.fullAddress.data.oktmo',
		REGION_KLADR_ID nvarchar(256) '$.fullAddress.data.region_kladr_id',
		AREA_WITH_TYPE nvarchar(256) '$.fullAddress.data.area_with_type',
		CITY nvarchar(256) '$.fullAddress.data.city',
		CITY_TYPE nvarchar(256) '$.fullAddress.data.city_type',
		SETTLEMENT nvarchar(256) '$.fullAddress.data.settlement',
		SETTLEMENT_TYPE nvarchar(256) '$.fullAddress.data.settlement_type',
		SETTLEMENT_WITH_TYPE nvarchar(256) '$.fullAddress.data.settlement_with_type',
		STREET_WITH_TYPE nvarchar(256) '$.fullAddress.data.street_with_type',
        STREET_TYPE nvarchar(256) '$.fullAddress.data.street_type',
        STREET_NAME nvarchar(256) '$.fullAddress.data.street',
		HOUSE nvarchar(256) '$.fullAddress.data.house',
		BUILDING nvarchar(256) '$.fullAddress.data.block',
		FLAT nvarchar(256) '$.fullAddress.data.flat'
	) b
	inner join bfx_impl.COUNTRY_REF c on c.ALFA_2 = b.COUNTRY_ISO_CODE
where 1=1
	and b.ADDRESS_TYPE_CODE = 'R'
	and /**where**/
";
        }

        public string GetPartyBody()
        {
            return "select BODY from PTY.PARTY where PARTY_CODE = @0";
        }

        public string GetPartyCommonData()
        {
            return @"
SELECT pt.PARTY_CODE
      ,pts.CONFIGURATION_CODE_NAME
      ,pts.NATURAL_PERSON_CATEGORY
      ,pts.FULL_NAME
      ,pts.SHORT_NAME
      ,pts.FIRST_NAME
      ,pts.LAST_NAME
      ,pts.MIDDLE_NAME
      ,pts.DATE_OF_BIRTH
      ,JSON_VALUE(pt.BODY, '$.partyPersonData.citizenship[0].countryCode') CITIZENSHIP_COUNTRY_CODE --TODO just citizenship[0] only?
      ,JSON_VALUE(pt.BODY, '$.partyPersonData.citizenship[0].alfa2') CITIZENSHIP_ALFA2_CODE         --TODO just citizenship[0] only?
      ,CASE WHEN JSON_VALUE(pt.BODY, '$.partyPersonData.isStatelessPerson') IS NULL OR JSON_VALUE(pt.BODY, '$.partyPersonData.isStatelessPerson') = 'false'
         THEN 0
         ELSE 1
       END IS_STATELESS_PERSON
      ,pts.IS_NON_RESIDENT
      ,pts.INNKIO INN
      ,pts.OGRNOGRNIP OGRN
      ,JSON_VALUE(pt.BODY, '$.partyOrganisationData.KPP') KPP
      ,CASE WHEN JSON_VALUE(pt.BODY, '$.partyPersonData.isPublicOfficial') IS NULL OR JSON_VALUE(pt.BODY, '$.partyPersonData.isPublicOfficial') = 'false'
         THEN '0'
         ELSE
           (select coalesce(OFFICIAL_CODE, 0) from BFX_IMPL.EXECUTIVE_PERSON ep
           WHERE ep.CODE = JSON_VALUE(pt.BODY, '$.partyPersonData.executivePerson.executivePersonCode'))
       END PUBLIC_OFFICIAL_CODE
FROM PTY.PARTY pt
    JOIN PTY_IMPL.PARTY_HUB pth on pth.PARTY_CODE = pt.PARTY_CODE
    JOIN PTY_IMPL.PARTY_INFO_SAT_LATEST pts on pts.PARTY_INFO_HKEY = pth.PARTY_HKEY
    /**leftjoin**/
WHERE 1 = 1
  and /**where**/
";
        }

        public string GetPartyDocumentData()
        {
            return @"
SELECT pt.PARTY_CODE
      ,dt.OFFICIAL_CODE
      ,dt.IS_OFFICIAL_OTHER
      ,b.OTHER_DOC_TYPE_DESC
      ,ds.DOC_SERIES
      ,ds.DOC_NUMBER
      ,ds.ISSUE_DATE
      ,ds.ISSUER_NAME
      ,b.ISSUER_CODE
FROM PTY_IMPL.PARTY_DOCUMENTS_SAT_LATEST ds
    JOIN BFX_IMPL.DOCUMENT_TYPE dt on dt.CODE = ds.DOC_TYPE_CODE
    JOIN PTY_IMPL.PARTY_HUB pth on pth.PARTY_HKEY = ds.PARTY_DOCUMENTS_HKEY
    JOIN PTY.PARTY pt on pt.PARTY_CODE = pth.PARTY_CODE
    CROSS APPLY OPENJSON(pt.BODY, '$.partyDocuments') 
    WITH(ISSUER_CODE nvarchar(256) '$.issuerCode'
        ,OTHER_DOC_TYPE_DESC nvarchar(256) '$.otherDocTypeDesc') b 
WHERE ds.IS_DELETED = 0
  and /**where**/
";
        }

        public string GetPartyEmployeeData()
        {
            return @"
SELECT JSON_VALUE(sp.BODY, '$.position') POSITION   
      ,ps.FIRST_NAME
      ,ps.LAST_NAME
      ,ps.MIDDLE_NAME
      ,pps.COUNTRY_PHONE_CODE
      ,pps.FULL_NUMBER PHONE_FULL_NUMBER
      ,pps.COMMENTS PHONE_COMMENTS
      ,sps.ACTUAL_EMAIL
FROM ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST sps
    JOIN ORG_IMPL.SERVICE_PROVIDER_HUB sph on sph.SERVICE_PROVIDER_HKEY = sps.SERVICE_PROVIDER_INFO_HKEY
    JOIN ORG.SERVICE_PROVIDER sp on sp.SERVICE_PROVIDER_CODE = sph.SERVICE_PROVIDER_CODE
    JOIN PTY_IMPL.PARTY_HUB ph on ph.PARTY_CODE = sps.PARTY_CODE
    JOIN PTY_IMPL.PARTY_INFO_SAT_LATEST ps on ps.PARTY_INFO_HKEY = ph.PARTY_HKEY
    LEFT JOIN PTY_IMPL.PARTY_PHONES_SAT_LATEST pps on pps.PARTY_PHONES_HKEY = ph.PARTY_HKEY
WHERE pps.IS_DELETED = 0 
  and pps.IS_PREFERABLE = 1
  and /**where**/
";
        }
    }
}