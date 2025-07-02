namespace Adacta.AdInsure.RGSL.ORG.Infrastructure.OrganisationUnit.Queries
{
    static class OrganisationUnitDalQueries
    {
        public static string Select_SubordinateOrganisationUnitCodesByRootOrganisationUnitCode()
        {
            return @"
WITH OrganisationUnitsCTE (ORGANISATION_UNIT_ID, ORGANISATION_UNIT_CODE) AS
(
    SELECT
        ORGANISATION_UNIT_ID,
        ORGANISATION_UNIT_CODE
    FROM
        ORG.ORGANISATION_UNIT
    WHERE
        ORGANISATION_UNIT_CODE = @rootOrganisationUnitCode
    UNION ALL
    SELECT
        ou.ORGANISATION_UNIT_ID,
        ou.ORGANISATION_UNIT_CODE
    FROM
        ORG.ORGANISATION_UNIT ou
    INNER JOIN
        OrganisationUnitsCTE rootOU on
             rootOU.ORGANISATION_UNIT_ID = ou.PARENT_ID
)
SELECT ORGANISATION_UNIT_CODE FROM OrganisationUnitsCTE";
        }

        public static string Select_OrganisationUnitHistoryForServiceProvider()
        {
            return @"
with spOrganisationUnit as (
    select
        RANK() over (partition by SERVICE_PROVIDER_INFO_HKEY order by LOAD_DATE desc) AS R_NUMBER,
        SERVICE_PROVIDER_INFO_HKEY,
        ORGANISATION_UNIT_CODE,
        cast('1990-01-01' as date) as ORGANISATION_UNIT_VALID_FROM
    from
        ORG_IMPL.SERVICE_PROVIDER_INFO_SAT
)
select distinct
    ouHub.ORGANISATION_UNIT_CODE as CODE,
    spOrg.ORGANISATION_UNIT_VALID_FROM as VALID_FROM,
    ouInfo.NAME
from 
    org.SERVICE_PROVIDER sp
    inner join CFX.PUBLISHED_ARTIFACT a on a.PUBLISHED_ARTIFACT_ID = sp.PUBLISHED_ARTIFACT_ID
    inner join ORG_IMPL.SERVICE_PROVIDER_HUB spHub on spHub.SERVICE_PROVIDER_CODE = sp.SERVICE_PROVIDER_CODE
    inner join spOrganisationUnit spOrg on spOrg.SERVICE_PROVIDER_INFO_HKEY = spHub.SERVICE_PROVIDER_HKEY and spOrg.R_NUMBER = 1
    inner join org_impl.ORGANISATION_UNIT_HUB ouHub on ouHub.ORGANISATION_UNIT_CODE = spOrg.ORGANISATION_UNIT_CODE
    inner join org_impl.ORGANISATION_UNIT_INFO_SAT ouInfo on ouInfo.ORGANISATION_UNIT_INFO_HKEY = ouHub.ORGANISATION_UNIT_HKEY
where 1=1
    and sp.SERVICE_PROVIDER_CODE = @serviceProviderCode
    and a.CODE_NAME = @serviceProviderType";
        }
    }
}
